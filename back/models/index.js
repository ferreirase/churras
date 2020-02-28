/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var SequelizeErd = require('sequelize-erd');
var basename  = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var db = {};
var sqlz = {}

fs
  .readdirSync(path.join(__dirname,"../models/"))
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    if(file != 'index.js' ){
      var model = sequelize['import'](path.join(__dirname,"../src/app/models", file));
      db[model.name] = model;
    }
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const svg = SequelizeErd(sqlz);
fs.writeFileSync('./erd.svg', svg);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
