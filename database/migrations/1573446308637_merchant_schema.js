"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MerchantSchema extends Schema {
  up() {
    this.create("merchants", table => {
      table.increments();
      table.string("name");
      table.string("address");
      table.text("deskripsi");
      table.string("gambar");
      table.integer("iduser");
      table.timestamps();
    });
  }

  down() {
    this.drop("merchants");
  }
}

module.exports = MerchantSchema;
