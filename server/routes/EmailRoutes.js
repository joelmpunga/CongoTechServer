const express = require('express');
const router = express.Router();
const emailController = require('../controllere/EmailController.js');

// GET /emails
router.get('/emails', emailController.getEmails);

module.exports = router;
