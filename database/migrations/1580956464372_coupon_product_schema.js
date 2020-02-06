'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponProductSchema extends Schema {
  up () {
    this.create('coupon_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('coupon_products')
  }
}

module.exports = CouponProductSchema
