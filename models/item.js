'use strict';
const {
  Model
} = require('sequelize');

const currencyFormat = require('../helpers/currencyFormat');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formattedPrice() {
      return currencyFormat(this.price);
    }
  }
  Item.init({
    productName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Product Name harus diisi boss!"
        },
        len: {
          args: [2],
          msg: "Masa iya, nama produk cuma 1 karakter?!"
        },
        detectIllegalWords() {
          let illegalWords = ["kasar", "cela"];
          console.log(this.productName);
          illegalWords.forEach(word => {
            if (this.productName.includes(word)) {
              throw new Error("Illegal name detected")
            }
          })
        }
      }
    },
    price: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Product Name harus diisi boss!"
        },
        len: {
          args: [2],
          msg: "Masa iya, nama produk cuma 1 karakter?!"
        },
        notContains: {
          args: "kasar",
          msg: "Illegal names detected!"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};