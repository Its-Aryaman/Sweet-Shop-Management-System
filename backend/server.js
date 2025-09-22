import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import authRoutes from './routes/auth.js';
import sweetsRoutes from './routes/sweets.js';
import swaggerSetup from './swagger.js';

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation
swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Sweet Shop Backend API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
