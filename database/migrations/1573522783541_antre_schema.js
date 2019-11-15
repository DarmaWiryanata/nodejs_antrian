'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AntreSchema extends Schema {
  up () {
    this.create('antres', (table) => {
      table.increments()
      table.integer('iduser');
      table.integer('idantre');
      table.integer('noantre');
      table.boolean('status');
      table.timestamps()
    })
  }

  down () {
    this.drop('antres')
  }
}

module.exports = AntreSchema
