// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./DB/DB.js');
// const authRoutes = require('./routes/auth');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Sweet Shop Backend API');
// });

// app.use('/api/auth', authRoutes);
// // app.use("/api/sweets", require("./routes/sweets"));
// // app.use('/api/sweets', require('./routes/sweets')); // Placeholder for sweets routes

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./DB/DB'); // Updated to use db/db.js
const authRoutes = require('./routes/auth');
const sweetsRoutes= require('./routes/sweets')

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sweet Shop Backend API');
});

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
// app.use('/api/sweets', require('./routes/sweets')); // Placeholder for sweets routes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));