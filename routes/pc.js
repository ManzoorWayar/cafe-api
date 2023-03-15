import express from 'express'
import PcController from '../controllers/pc.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authenticate)

router.route('/pc')
    .get(PcController.getPcs)

router.route('/pc')
    .post(PcController.createPc)

router.route('/pc/:id')
    .put(PcController.updatePc)

router.route('/pc/withdrawal/:id')
    .put(PcController.withdrawalPc)

router.route('/pc/:id')
    .delete(PcController.deletePc)

export default router