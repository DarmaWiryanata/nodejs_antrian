"use strict";
const Merchant = use("App/Models/Merchant");
const Database = use('Database');

class MerchantController {
  async index({ response }) {
    // const merchants = await Merchant.all();

    const merchants = await Database
      .leftJoin('merchants', 'submerchants.idmerchant', 'merchants.id')
      .select('merchants.name as name', 'submerchants.nama as nama', 'submerchants.deskripsi', 'submerchants.gambar', 'submerchants.id')
      .from('submerchants')
      .orderBy('id', 'desc')

    // return view.render("merchants.index", { merchants: merchants.rows });
    return response.json(merchants);
  }
}

module.exports = MerchantController;
