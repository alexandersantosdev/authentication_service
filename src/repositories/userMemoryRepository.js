const users = [];

const addUser = (user) => {
    let hasUser = users.find(u => u.email == user.email);
    if (hasUser) throw new Error('User already exists');
    users.push(user);
    return {
        userName: user.userName,
        email: user.email,
    }
}

const getUser = (user) => {
    let userFound = users.find(u => u.email == user.email);
    if (userFound) return userFound
    else return false;
}

const getUsers = () => {
    let usersToReturn = [];
    for (let user of users) {
        usersToReturn.push({
            userName: user.userName,
            email: user.email
        })
    }

    return usersToReturn;
}

const deleteUser = (user) => {
    let toRemove = users.find(u => u.email == user.email)
    if (toRemove) {
        users = users.filter(x => x.email == toRemove.email);
    }
}

const updateuser = (user) => {
    let userFound = users.indexOf(u => u.email == user.email);
    if (userFound) {
        users[userFound].userName = user.userName
        users[userFound].email = user.email
    }

    return {
        userName: user.userName,
        email: user.email
    }
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    updateuser,
    deleteUser
}