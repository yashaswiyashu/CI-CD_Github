import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import ReleasedSlot from '../models/releasedSlot.model';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { released_slot_id, user_id, center_id } = req.body;

    const slot = await ReleasedSlot.findById(released_slot_id);
    if (!slot) return res.status(404).json({ message: 'Released slot not found' });

    if (slot.available_appointments <= 0) {
      return res.status(400).json({ message: 'No available appointments for this slot' });
    }

    // Decrement slot count
    slot.available_appointments -= 1;
    await slot.save();

    // Create booking
    const booking = await Booking.create({
      released_slot_id,
      user_id,
      center_id,
      status: 'Booked'
    });

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getBookings = async (_: Request, res: Response) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Not found' });
  res.json(booking);
};

export const getBookingsByCenterId = async (req: Request, res: Response) => {
  try {
    const { center_id } = req.params;
    const bookings = await Booking.find({ center_id });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const updateBooking = async (req: Request, res: Response) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteBooking = async (req: Request, res: Response) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status === 'Cancelled') return res.status(400).json({ message: 'Already cancelled' });

    // Update booking status
    booking.status = 'Cancelled';
    await booking.save();

    // Increment released slot availability
    const slot = await ReleasedSlot.findById(booking.released_slot_id);
    if (slot) {
      slot.available_appointments += 1;
      await slot.save();
    }

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};