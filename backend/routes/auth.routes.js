/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = { email };
    res.status(200).json({ user: userData, token });
  } catch (message) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { login, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      login,
      email,
      password: hashedPassword,
    });
    const user = {
      id: newUser.id,
      login: newUser.login,
      email: newUser.email,
    };
    const token = jwt.sign(
      { user: { id: newUser.id } },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({ user, token });
  } catch (message) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200).json({ message: 'Logout successful' });
});

const checkToken = (req, res, next) => {
  const token = req.cookies.authToken || '';
  if (!token) {
    return res.status(401).json({ message: '' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (message) {
    res.status(500).json({ message: 'Server error' });
  }
};

router.get('/check', checkToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password'],
      },
      raw: true,
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
