import express from 'express'
const router = express.Router();
import annee from '../controller/AnneeController.js'
router.get('',annee.getAllAnnees)
router.post('/create',annee.createAnnee)
router.post('/encours/:id',annee.setEnCoursAnnee)
router.post('/cloturer/:id',annee.setCloturerAnneeEnCours)
router.delete('/delete/:id',annee.deleteAnnee)
router.get('/:id',annee.getByIdAnnee)
export default router