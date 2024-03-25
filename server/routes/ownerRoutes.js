import express from 'express'
const router = express.Router();
import owner from '../controller/ownersController.js'
router.get('',owner.getAllOwners)
router.post('/create',owner.createOwner)
router.delete('/delete/:id',owner.deleteOwner)
export default router