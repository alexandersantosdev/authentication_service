const { loginUser, registerUser, validateAccessToken } = require('../services/userAuthService');

const register = async (req, res) => {
    if (!req.body || !req.body.user) return res.status(400).json({ message: 'Body must contains a valid user' })
    await registerUser(req.body.user)
        .then(user => res.status(201).json({ message: 'User created', user }))
        .catch(error => {
            return res.status(400).json({ message: 'Error creating user', error: error.message })
        });

}

const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'incorrect email or password' });
    await loginUser(email, password)
        .then(token => res.status(200).json({ message: 'user authenticated', ...token }))
        .catch(error => res.status(401).json({ message: 'incorrect email or password' }));
}

const validateToken = async (req, res) => {
    let { accessToken } = req.body;
    if (!accessToken) return res.status(400).json({ message: 'Invalid accessToken' });
    await validateAccessToken(accessToken)
        .then(token => res.status(200).json({ message: 'token valid', ...token }))
        .catch(error => res.status(401).json({ message: 'Invalid accessToken' }))
}

module.exports = {
    register,
    login,
    validateToken
};