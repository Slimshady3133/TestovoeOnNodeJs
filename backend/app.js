require('dotenv').config();
const express = require('express');

const db = require('./db/models');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 5000;

const authReg = require('./routes/auth.routes');
const Blogs = require('./routes/blog.routes');

config(app);

app.use('/api/auth', authReg);
app.use('/api/blog', Blogs);

const start = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    app.listen(PORT);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
start();
