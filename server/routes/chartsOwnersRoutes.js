import express from 'express';
import chartsOwners from '../controller/chartsOwnersController.js';

const router = express.Router();

router.get('/', chartsOwners.getNumberOwner);
router.get('/particulier',chartsOwners.getNumberParticulier);
router.get('/entreprise', chartsOwners.getNumberEntreprise)

export default router;
