const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  
  const { email , password } = req.body;

  let user = await User.findOne({email});

  if(user) res.status(400).json({errorMessage: 'Email already exist!'});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  user = new User({email , password: hashedPassword});
  await user.save();
  res.status(201).json(user);
  
}

exports.signIn = async (req, res) => {
  const { email , password } = req.body;

  let user = await User.findOne({email});

  if(!user) return res.status(400).json({errorMessage: 'Email or password invalid!'});

  const isValidPassword = await bcrypt.compare(password, user.password);

  if(!isValidPassword) return res.status(400).json({errorMessage: 'Email or password invalid!'});

  const token = jwt.sign({ email: user.email, userid: user._id }, process.env.SECRET);

  res.status(200).send(token);

}