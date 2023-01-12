const { Model, DataTypes } = require('sequelize');
const { formatNamedParameters } = require('sequelize/types/utils');
const sequelize = require('../config/connection');

class Comments extends Model {}
// comments model with data and parameters 
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_body: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    blog_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'blog',
        key: 'id'
    }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;