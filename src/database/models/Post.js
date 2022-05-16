'use strict';
const {
  Model
} = require('sequelize');
// import {DataTypes, Model } from 'sequelize';
// import { sequelize } from '.'; 

module.exports =  (sequelize, DataTypes) => {
   class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User,{onDelete:"CASCADE",onUpdate:"CASCADE", foreignKey:"userId"}) // ,{as:"author", foreignKey:"userEmail"}
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};