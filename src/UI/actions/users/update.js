const User = require('../../../Domain/models/user');

const updateUser = async ({id, name, email}) => {
    const temp = {
        name: name,
        email: email
    }

    let updateUser = await User.findByIdAndUpdate(id, temp, {
        new: true
    });

    return updateUser;
}

module.exports = updateUser;