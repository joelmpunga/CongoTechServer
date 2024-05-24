import express from 'express';
import chartsUser from '../controller/chartUsersController.js';

const router = express.Router();

router.get('/', chartsUser.getNumberUser);
router.get('/admin',chartsUser.getNumberAdmin);
router.get('/secretaire', chartsUser.getNumberSecretaire)

export default router;
