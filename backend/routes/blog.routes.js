/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Blog } = require('../db/models');
const { User } = require('../db/models');

const checkToken = (req, res, next) => {
  const token = req.cookies.authToken || '';
  const localStorageToken = req.headers.authorization?.split(' ')[1] || '';
  if (!token && !localStorageToken) {
    return res.status(401).json({ message: '' });
  }
  try {
    const decoded = jwt.verify(
      localStorageToken || token,
      process.env.JWT_SECRET_KEY
    );
    req.userId = decoded.user.id;
    next();
  } catch (message) {
    res.status(500).json({ message: 'Server error' });
  }
};

router.get('/', async (req, res) => {
  try {
    const Descriptions = await Blog.findAll({
      raw: true,
      include: {
        model: User,
        attributes: ['login'],
      },
      order: [['id', 'ASC']],
    });
    res.status(200).json(Descriptions);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.delete('/:id', checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await Blog.findOne({ where: { id } });
    if (!blogPost) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    if (blogPost.userId !== req.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await Blog.destroy({ where: { id } });
    res.json(Number(id));
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.put('/:id', checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const blogPost = await Blog.findOne({ where: { id } });
    if (!blogPost) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    if (blogPost.userId !== req.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await Blog.update({ description }, { where: { id } });
    const data = await Blog.findOne({ where: { id } });
    res.json(data);
  } catch ({ message }) {
    res.status(500).json({ message: ' Crushed' });
  }
});

module.exports = router;
