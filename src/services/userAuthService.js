const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, deleteUser, getUser, getUsers, updateuser } = require('../repositories/userMemoryRepository');

const registerUser = async (user) => {

    let errors = validateUser(user);
    if (errors.length > 0) throw new Error(errors.join(', '));

    let { email, password, userName } = user;

    let hashPassword = await bcrypt.hash(password, 10);

    let userCreated = {
        userName,
        email,
        password: hashPassword
    }

    userCreated = addUser(userCreated)

    return userCreated;
}

const loginUser = async (email, password) => {
    let user = getUser({ email });
    if (!user) throw new Error('User not found');

    if (bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
        return token;
    }
    throw new Error('User not found');
}

const validateAccessToken = async (accessToken) => {
    return jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return false;
        return { email: decoded.email };
    });
}

const validateUser = ({ email, password, userName }) => {
    let errors = [];

    if (!email) errors.push('Invalid or not informed email');
    if (!password) errors.push('Password not informed');
    if (!userName) errors.push('userName not informed');

    let regxMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    if (!regxMail.test(email)) errors.push(`the following email "${email}" does not match a valid email type`);

    return errors;
}

module.exports = {
    registerUser,
    loginUser,
    validateAccessToken
}