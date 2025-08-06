import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByCenterId,
  cancelBooking
} from '../controllers/appointment.controller';

const router = Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.get('/center/:center_id', getBookingsByCenterId);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.patch('/cancel/:id', cancelBooking);

export default router;