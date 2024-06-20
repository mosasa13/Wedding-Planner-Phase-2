import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import secrets from './config/secrets.js';
import connectDB from './config/db.js';
import adminAuth from './middlewares/adminAuth.js';
import registrationRouter from './routes/registration.js';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';

const app = express();
const { port } = secrets;

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();

// Routes setup
app.use('/', registrationRouter);
app.use('/admin', adminAuth, adminRouter);
app.use('/user', userRouter);

// Homepage route
app.get('/', (req, res) => {
  res.render('./index.ejs', { title: 'Home Page' });
});

// 404 Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Start server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
