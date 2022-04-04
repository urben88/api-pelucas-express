'use strict';
const {
  Model
} = require('sequelize');
import {DataTypes, Model } from 'sequelize';
import { sequelize } from '.'; 

module.exports =  (sequelize, DataTypes) => {
   class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.user)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {

    sequelize,
    modelName: 'Post',
  });
  return Post;
};