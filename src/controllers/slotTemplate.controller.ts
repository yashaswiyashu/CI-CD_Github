import { Request, Response } from 'express';
import SlotTemplate from '../models/slotTemplate.model';
import SlotTemplateItem from '../models/slotTemplateItem.model';

export const createSlotTemplate = async (req: Request, res: Response) => {
  try {
    const { name, slots } = req.body;
    const template = await SlotTemplate.create({ name });
    const slotItems = slots.map((s: any) => ({ ...s, template_id: template._id }));
    await SlotTemplateItem.insertMany(slotItems);
    res.status(201).json({ template, slots: slotItems });
  } catch (err) {
    res.status(500).json({ error: (err as any).message });
  }
};

export const getSlotTemplates = async (_: Request, res: Response) => {
  const templates = await SlotTemplate.find();
  res.json(templates);
};

export const getSlotTemplateById = async (req: Request, res: Response) => {
  const template = await SlotTemplate.findById(req.params.id);
  if (!template) return res.status(404).json({ message: 'Not found' });
  const slots = await SlotTemplateItem.find({ template_id: template._id });
  res.json({ template, slots });
};

export const updateSlotTemplate = async (req: Request, res: Response) => {
  const updated = await SlotTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteSlotTemplate = async (req: Request, res: Response) => {
  await SlotTemplate.findByIdAndDelete(req.params.id);
  await SlotTemplateItem.deleteMany({ template_id: req.params.id });
  res.json({ message: 'Deleted successfully' });
};
