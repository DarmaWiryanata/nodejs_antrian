"use strict";

/*
|--------------------------------------------------------------------------
| MerchantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Merchant = use("App/Models/Merchant");

class MerchantSeeder {
  async run() {
    // menggunakan Merchant model
    const merchant1 = new Merchant();
    merchant1.name = "Polda Bali";
    merchant1.address =
      "Jl. WR Supratman No.7, Sumerta Kauh, Kec. Denpasar Tim., Kota Denpasar, Bali 80236";
    await merchant1.save();

    // menggunakan Merchant model
    const merchant2 = new Merchant();
    merchant2.name =
      "Dinas Komunikasi, Informatika dan Statistik Provinsi Bali (Diskominfos)";
    merchant2.address =
      "Jl. Panjaitan No.7, Sumerta Kelod, Denpasar Sel, Sumerta Kelod, Kec. Denpasar Sel., Kota Denpasar, Bali 80234";
    await merchant2.save();

    // menggunakan Merchant model
    const merchant3 = new Merchant();
    merchant3.name = "Bali Governor Office";
    merchant3.address =
      "Jl. Basuki Rahmat No.1, Sumerta Kelod, Kec. Denpasar Tim., Kota Denpasar, Bali 80234";
    await merchant3.save();
  }
}

module.exports = MerchantSeeder;
