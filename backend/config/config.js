const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.disable('x-powered-by');
};

module.exports = serverConfig;
