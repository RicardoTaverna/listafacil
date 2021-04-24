'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListProductSchema extends Schema {
  up () {
    this.create('list_product', (table) => {
      table.integer('list_id').unsigned().index('list_id')
      table.integer('product_id').unsigned().index('product_id')
      table.foreign('list_id').references('lists.id').onDelete('cascade')
      table.foreign('product_id').references('products.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('list_product')
  }
}

module.exports = ListProductSchema
