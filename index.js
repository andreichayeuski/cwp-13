const Sequelize = require('sequelize');

const config = require('./config.json');

const db = require('./models')(Sequelize, config);
const Op = Sequelize.Op;

