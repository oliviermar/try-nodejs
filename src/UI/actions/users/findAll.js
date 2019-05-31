const express = require('express');
let router = express.Router();
const User = require('../../../Domain/models/user');

const getUsers = () => new Promise((resolve) => {
    let users = User.find({}) || [];
    resolve(users);
});

module.exports = getUsers;