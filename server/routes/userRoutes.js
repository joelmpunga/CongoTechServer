const express = require('express');
const router = express.Router();
const User = require('../model/usersModel')
const user = new User();
router.get('',user.getAll)
module.exports = router