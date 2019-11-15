'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubmerchantSchema extends Schema {
  up () {
    this.create('submerchants', (table) => {
      table.increments()
      table.integer('idmerchant');
      table.string('nama');
      table.text('deskripsi');
      table.string('gambar');
      table.integer('user');
      table.timestamps()
    })
  }

  down () {
    this.drop('submerchants')
  }
}

module.exports = SubmerchantSchema
