import mongoose, { Schema, Document } from 'mongoose';

interface IReleasedSlot extends Document {
  center_id: string;
  slot_template_id: string;
  date: string;
  start_time: string;
  end_time: string;
  slot_type: string;
  total_appointments: number;
  available_appointments: number;
}

const ReleasedSlotSchema: Schema = new Schema({
  center_id: { type: String, required: true },
  slot_template_id: { type: String, required: true },
  date: { type: String, required: true },
  start_time: String,
  end_time: String,
  slot_type: String,
  total_appointments: Number,
  available_appointments: Number
});

export default mongoose.model<IReleasedSlot>('ReleasedSlot', ReleasedSlotSchema);