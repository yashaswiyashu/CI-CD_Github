import { Request, Response } from 'express';
import ReleasedSlot from '../models/releasedSlot.model';
import SlotTemplateItem from '../models/slotTemplateItem.model';

export const createReleasedSlot = async (req: Request, res: Response) => {
  try {
    const {
      center_id,
      start_date,
      end_date,
      weekday_template_map
    } = req.body;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const releasedSlots = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const templateId = weekday_template_map[weekday];

      if (!templateId || templateId === 'none') continue;

      const slots = await SlotTemplateItem.find({ template_id: templateId });

      const workSlots = slots.filter(slot => slot.slot_type.toLowerCase().includes('work'));

      for (const slot of workSlots) {
        releasedSlots.push({
          center_id,
          slot_template_id: templateId,
          date: currentDate.toISOString().split('T')[0],
          start_time: slot.start_time,
          end_time: slot.end_time,
          slot_type: slot.slot_type,
          total_appointments: 1,
          available_appointments: 1
        });
      }
    }

    const result = await ReleasedSlot.insertMany(releasedSlots);
    res.status(201).json({
      total_appointments_created: releasedSlots.length,
      slots: result
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReleasedSlots = async (_: Request, res: Response) => {
  const slots = await ReleasedSlot.find();
  res.json(slots);
};

export const getReleasedSlotById = async (req: Request, res: Response) => {
  const slot = await ReleasedSlot.findById(req.params.id);
  if (!slot) return res.status(404).json({ message: 'Not found' });
  res.json(slot);
};

export const getReleasedSlotsByCenterId = async (req: Request, res: Response) => {
  try {
    const { center_id } = req.params;
    const slots = await ReleasedSlot.find({ center_id });
    res.json(slots);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFutureReleasedSlotsByCenter = async (req: Request, res: Response) => {
  try {
    const { center_id } = req.params;

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 14);

    const slots = await ReleasedSlot.find({
      center_id,
      date: { $gte: futureDate.toISOString().split('T')[0] }
    });

    res.json(slots);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReleasedSlot = async (req: Request, res: Response) => {
  const updated = await ReleasedSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteReleasedSlot = async (req: Request, res: Response) => {
  await ReleasedSlot.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
