const express = require('express');
let router = express.Router();
const User = require('../../../Domain/models/user');

const getUserById = (id) => new Promise((resolve) => {
    let user = User.findById(id);

    resolve(user);
})

module.exports = getUserById;