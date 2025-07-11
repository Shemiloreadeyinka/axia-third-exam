const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/user', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/kyc', require('./routes/kycRoutes'));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
