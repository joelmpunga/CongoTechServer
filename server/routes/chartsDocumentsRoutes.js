import express from 'express';
import chartsDoc from '../controller/ChartsDocumentsController.js';

const router = express.Router();

router.get('/', chartsDoc.getNumberDoc);
router.get('/unclassed',chartsDoc.getUnClassedDoc);
// router.get('/date/:date', chartsDoc.getNumberDocDate)
router.get('/month/:month', chartsDoc.getNumberDocMonth)
// router.get('/currentMonth', chartsDoc.getNumberDocCurrentMonth)
router.get('/year/:year', chartsDoc.getNumberDocYear)

export default router;
