const User = require('../../../Domain/models/user');

const createUser = async ({name, email}) => {
    const temp = {
        name: name,
        email: email
    }

    let newUser = await User.create(temp);

    return newUser;
}

module.exports = createUser;