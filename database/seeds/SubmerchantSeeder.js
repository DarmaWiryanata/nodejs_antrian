'use strict'

/*
|--------------------------------------------------------------------------
| SubmerchantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Submerchant = use("App/Models/Submerchant");

class SubmerchantSeeder {
  async run () {
    // menggunakan Merchant model
    const merchant1 = new Submerchant();
    merchant1.nama = "Polda Bali";
    merchant1.deskripsi =
      "Jl. WR Supratman No.7, Sumerta Kauh, Kec. Denpasar Tim., Kota Denpasar, Bali 80236";
    await merchant1.save();

    // menggunakan Merchant model
    const merchant2 = new Submerchant();
    merchant2.nama =
      "Dinas Komunikasi, Informatika dan Statistik Provinsi Bali (Diskominfos)";
    merchant2.deskripsi =
      "Jl. Panjaitan No.7, Sumerta Kelod, Denpasar Sel, Sumerta Kelod, Kec. Denpasar Sel., Kota Denpasar, Bali 80234";
    await merchant2.save();

    // menggunakan Merchant model
    const merchant3 = new Submerchant();
    merchant3.nama = "Bali Governor Office";
    merchant3.deskripsi =
      "Jl. Basuki Rahmat No.1, Sumerta Kelod, Kec. Denpasar Tim., Kota Denpasar, Bali 80234";
    await merchant3.save();
  }
}

module.exports = SubmerchantSeeder
