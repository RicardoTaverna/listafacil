'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('quantity').defaultTo(1)
      table.float('value').notNullable()
      table.float('total').notNullable()
      table.string('stablishment').notNullable()
      table.boolean('finished').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
