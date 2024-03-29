import express from 'express'
const router = express.Router();
import emailController from '../controller/EmailController.js';

// GET /emails
router.get('/', emailController.getEmails);

export default router;
