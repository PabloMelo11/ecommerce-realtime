'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CuouponOrderSchema extends Schema {
  up() {
    this.create('cuoupon_order', table => {
      table.increments();
      table.integer('coupon_id').unsigned();
      table.integer('order_id').unsigned();
      table.decimal('discount', 12, 2).defaultTo(0.0);
      table.timestamps();

      table
        .foreign('coupon_id')
        .references('id')
        .inTable('coupons')
        .onDelete('CASCADE');

      table
        .foreign('order_id')
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('cuoupon_order');
  }
}

module.exports = CuouponOrderSchema;
