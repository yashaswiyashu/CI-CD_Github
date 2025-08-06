import mongoose, { Schema, Document } from 'mongoose';

interface ISlotTemplate extends Document {
  name: string;
  created_on: Date;
  disabled_on?: Date;
}

const SlotTemplateSchema: Schema = new Schema({
  name: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  disabled_on: { type: Date }
});

export default mongoose.model<ISlotTemplate>('SlotTemplate', SlotTemplateSchema);