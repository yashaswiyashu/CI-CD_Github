import { Router } from 'express';
import {
  createSlotTemplate,
  getSlotTemplates,
  getSlotTemplateById,
  updateSlotTemplate,
  deleteSlotTemplate
} from '../controllers/slotTemplate.controller';

const router = Router();

router.post('/', createSlotTemplate);
router.get('/', getSlotTemplates);
router.get('/:id', getSlotTemplateById);
router.put('/:id', updateSlotTemplate);
router.delete('/:id', deleteSlotTemplate);

export default router;
