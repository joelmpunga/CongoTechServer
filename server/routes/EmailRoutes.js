import express from 'express'
const router = express.Router();
import emailController from '../controllere/EmailController.js';

// GET /emails
router.get('/emails', emailController.getEmails);

module.exports = router;
