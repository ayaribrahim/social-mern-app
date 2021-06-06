const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if(!token) return res.sendStatus(401);
 
  try{
   const user = await jwt.verify(token, process.env.SECRET);
   if(!user) return res.sendStatus(403);

  req.user = user;
  next()
 }catch(err){
  res.status(500).send(err);
 }
}

module.exports = auth;