 const jwt = require('jsonwebtoken');

 const authentication = (req, res, next) => {
 const { token } = req.cookies;

 if (!token) {
  return res.send('Please login to your account');
 }

 jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
  if (err) {
   console.log('Error verifying token');
   return res.status(401).send('Invalid or expired token');
  }
  req.user = { id: payload.id, admin: payload.isAdmin };
  next();
 }); 
};
module.exports = authentication;