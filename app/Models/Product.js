'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  image() {
    return this.belongsTo('App/Models/Image');
  }

  /**
   * Relacionamento entre produtos e images
   * Galeria de imagens do produto
   */
  images() {
    return this.belongsToMany('App/Models/Image');
  }

  /**
   * Relacionamento entre produtos e categorias
   */
  categories() {
    return this.belongsToMany('App/Models/Category');
  }

  /**
   * Relacionamento entre produto e coupon
   */
  coupons() {
    return this.belongsToMany('App/Models/Coupon');
  }
}

module.exports = Product;
