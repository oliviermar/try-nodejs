const User = require('../../../Domain/models/user');

const deleteUser = async (id) => {
    await User.findByIdAndRemove(id);
    return true;
}

module.exports = deleteUser;