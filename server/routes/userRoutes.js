const express = require('express');
const router = express.Router();
const user = require('../controller/usersController')
router.get('',user.getAllUsers)
router.post('/signup',user.createUser)
router.delete('/delete/:id',user.deleteUser)
module.exports = router