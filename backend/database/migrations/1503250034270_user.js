'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('is_staff').defaultTo(false)
      table.string('name', 50)
      table.string('lastname', 60)
      table.string('adress', 254)
      table.string('district', 254)
      table.string('city', 254)
      table.string('uf', 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
