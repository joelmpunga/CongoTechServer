import express from 'express';
import  getEmails  from '../controller/EmailController.js';

const router = express.Router();

router.get('/', getEmails);

export default router;
