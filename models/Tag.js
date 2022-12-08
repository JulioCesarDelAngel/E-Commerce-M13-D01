const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const ProductTag = require('./ProductTag.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name:{
      type: DataTypes.STRING
    }
  },
  {
    hooks:{
      beforeDestroy : async (tag) =>{
        console.log('Eliminar dependencias ProductTag TAg_id', tag.id);
        await ProductTag.destroy({where : {tag_id : tag.id}});
      }

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
