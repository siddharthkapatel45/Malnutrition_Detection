import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import Signup from './models/Signup.js';
import Patient_data from './Routes/Patient_data.js';
// import Patient_data from './Routes/Patient_data.js';
dotenv.config();

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect(process.env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(cors({
  origin: ['https://greddit-main.onrender.com', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/patient',Patient_data);
// auth middleware
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Signup.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (error) {
      return done(error);
    }
  })
);

const localAuthMiddleware = passport.authenticate('local', { session: false });

// Root Route
app.get('/', (req, res) => {
  res.send('Server is working, successfully');
});
app.post('/signup', async (req, res) => {
      const { name, username, email, password,role } = req.body;
    
      if (!name || !username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password length must be at least 6 characters.' });
      }
    
      try {
        const existingUser = await Signup.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(409).json({ message: 'Username or email already exists.' });
        }
    
        const person = new Signup({
          name,
          username,
          email,
          password,
          role
        });
    
        await person.save();
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
      }
    });
    // login api
    app.post('/login', localAuthMiddleware, async (req, res) => {
      const { username } = req.body;
    
      try {
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Failed to generate token' });
      }
    });










app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});