import express from 'express';
import slotTemplateRoutes from './routes/slotTemplate.routes';
import appointmentRoutes from './routes/appointment.routes';
import releasedSlotRoutes from './routes/releasedSlot.routes';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Appointment Service API is running');
});

app.use('/api/slot-templates', slotTemplateRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/released-slots', releasedSlotRoutes);

export default app;