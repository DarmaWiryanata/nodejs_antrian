"use strict";
const Merchant = use("App/Models/Merchant");

class MerchantController {
  async index({ response }) {
    const merchants = await Merchant.all();

    // return view.render("merchants.index", { merchants: merchants.toJSON() });
    return response.json(merchants);
  }
}

module.exports = MerchantController;
