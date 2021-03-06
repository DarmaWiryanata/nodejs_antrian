'use strict'
const Database = use('Database');
const Antre = use("App/Models/Antre");

class FrontController {
  async index({ view }) {
    const submerchants = await Database
      .leftJoin('merchants', 'submerchants.idmerchant', 'merchants.id')
      .select('merchants.name', 'submerchants.nama', 'submerchants.deskripsi', 'submerchants.gambar', 'submerchants.id', 'submerchants.gambar')
      .from('submerchants')
      .orderBy('id', 'desc')

    return view.render("index", { submerchants: submerchants });
    // return response.json(submerchants);
  }
  
  async list({ view,response }) {
    const submerchants = await Database
      .leftJoin('merchants', 'submerchants.idmerchant', 'merchants.id')
      .select('merchants.name', 'submerchants.nama', 'submerchants.deskripsi', 'submerchants.gambar', 'submerchants.id', 'submerchants.gambar')
      .from('submerchants')
      .orderBy('id', 'desc')

    return view.render("shop", { submerchants: submerchants });
    // return response.json(submerchants);
  }

  async show({ params, view }) {
    const submerchant = await Database
      // .findOrFail(params.id)
      .join('merchants', 'submerchants.idmerchant', 'merchants.id')
      .select('merchants.name as name', 'submerchants.nama as nama', 'submerchants.deskripsi', 'submerchants.gambar', 'submerchants.id')
      .from('submerchants')
      .where('submerchants.id', params.id)
      .first()

    const antre = await Database
      .select('iduser', 'idantre', 'status')
      .from('antres')
      .where('iduser', auth.id)
      .where('idantre', params.id)
      .where('status', 0)
      .first()

    return view.render("product-single", { submerchant: submerchant, antre: antre });
    // return response.json(submerchant);
  }

  async store({request, response, view, session}){
    const submerchant = await Database
      .from('antres')
      .where('idantre', request.input('idantre'))
      .getCount()

    const antres = await Database
      .select('iduser', 'idantre', 'status')
      .from('antres')
      .where('iduser', auth.id)
      .where('idantre', request.input('idantre'))
      .where('status', 0)
      .first()

    if (isset(antres)) {
      session.flash({ 
        notification: {
          type: 'danger',
          message: 'Anda telah masuk dalam antrian ini'
        }
      })

      return response.redirect('back')
    } else {
      const antre = new Antre();
  
      antre.iduser = auth.id;
      antre.idantre = request.input('idantre');
      antre.noantre = submerchant+1;
      antre.status = 0;
  
      await antre.save();
  
      session.flash({ notification: 'Successfully create!' });
      return response.route('index.antrian')
    }
  }
}

module.exports = FrontController
