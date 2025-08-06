import mongoose, { Schema, Document } from 'mongoose';

interface ISlotTemplateItem extends Document {
  template_id: mongoose.Schema.Types.ObjectId;
  start_time: string;
  end_time: string;
  slot_type: string;
}

const SlotTemplateItemSchema: Schema = new Schema({
  template_id: { type: Schema.Types.ObjectId, ref: 'SlotTemplate', required: true },
  start_time: String,
  end_time: String,
  slot_type: { type: String, enum: ['Work Slot', 'Short Break', 'Lunch Break'] }
});

export default mongoose.model<ISlotTemplateItem>('SlotTemplateItem', SlotTemplateItemSchema);