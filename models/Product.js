// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

const ProductTag = require('./ProductTag');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id :{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name :{
      type: DataTypes.STRING,
      allowNull: false      
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        isDecimal:true
      }
    },
    stock :{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
        isNumeric: true
      }
    },
    category_id :{
      type:DataTypes.INTEGER,
      // Set FK relationship (hasMany) with `Trainer` (en este caso  Category)
      references:{
        model: 'category',  //model name definido en Otras configuraciones del modelo 
        key: 'id'
      }
    }

  },
  {
    hooks:{
      beforeDestroy: async (product) =>{
        console.log('Eliminar dependencias ProductTag product_id=:',product.id)
        await ProductTag.destroy( {where : {product_id:product.id} })
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
