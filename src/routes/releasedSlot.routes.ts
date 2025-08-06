import { Router } from 'express';
import {
  createReleasedSlot,
  getReleasedSlots,
  getReleasedSlotById,
  updateReleasedSlot,
  deleteReleasedSlot,
  getReleasedSlotsByCenterId,
  getFutureReleasedSlotsByCenter
} from '../controllers/releasedSlot.controller';

const router = Router();

router.post('/', createReleasedSlot);
router.get('/', getReleasedSlots);
router.get('/:id', getReleasedSlotById);
router.get('/center/:center_id', getReleasedSlotsByCenterId);
router.get('/future/after-14-days/:center_id', getFutureReleasedSlotsByCenter);
router.put('/:id', updateReleasedSlot);
router.delete('/:id', deleteReleasedSlot);

export default router;
