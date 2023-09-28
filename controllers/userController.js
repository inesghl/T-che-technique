const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
  // User registration
  register: async (req, res) => {
    try {

      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // crypt password 
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const user = await User.create({
        username,
        email,
        password : hashedPassword , 
        role: 'admin',
      });

      // JWT token for the user

      const token = jwt.sign({ userId: user.user_id, role: user.role }, 'secret', { expiresIn: '24h' });

      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Unable to register user' });
    }
  },

  
  // User login

login: async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.user_id, role: user.role }, 'secret', { expiresIn: '24h' });

    
    return res.json({ user, role: user.role, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Unable to log in user' });
  }
},


};
