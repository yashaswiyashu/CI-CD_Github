import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  released_slot_id: string;
  user_id: string;
  booked_on: Date;
  center_id: string;
  status: string;
}

const BookingSchema: Schema = new Schema({
  released_slot_id: { type: String, required: true },
  center_id: { type: String, required: true },
  user_id: { type: String, required: true },
  booked_on: { type: Date, default: Date.now },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' }
});

export default mongoose.model<IBooking>('Booking', BookingSchema);