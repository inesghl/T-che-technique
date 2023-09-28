const jwt = require('jsonwebtoken');
const db = require('../config/database');

// authentificqation
function authenticateToken(req, res, next) {
    
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
      console.log('Token missing');
     
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // console.log(' token:', token); 
    // console.log('Secret key:', db.jwtSecret); 
  
    jwt.verify(token,'secret', (err, user) => {
      if (err) {
        console.error('Error token:', err);
        return res.status(403).json({ error: 'Forbidden' });
      }
      console.log(' user:', user);
      req.user = user; 
      next(); // Continue 
    });
  }
  
// user auth
function authorizeUser(req, res, next) {
  if (req.user.role === 'user') {

    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
}
// admin auth
function authorizeAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    
    next();
  } else {
    console.log(req.user.role)
    res.status(403).json({ message: 'Access denied' });
  }
}

module.exports = {
  authenticateToken,
  authorizeUser,
  authorizeAdmin,
};
