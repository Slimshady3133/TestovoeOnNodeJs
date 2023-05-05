require('dotenv').config();
const path = require('path');
const express = require('express');

const db = require('./db/models');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 5000;

const authReg = require('./routes/auth.routes');
const Blogs = require('./routes/blog.routes');

const buildDir = path.join(__dirname, '../frontend/build');
app.use(express.static(buildDir));

config(app);

app.use('/api/auth', authReg);
app.use('/api/blog', Blogs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const start = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    app.listen(PORT);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
start();
