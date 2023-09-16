const knex = require('../../database/database');

module.exports = {
  // Função para buscar todas as denúncias
  async searchdenounce(req, res) { 
    try {
      const result = await knex('Denounce');
      return res.status(201).json(result);
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para buscar denúncias por email de usuário
  async searchdenounceByEmail(req, res) {
    try {
      const { email } = req.params; 

      const user = await knex('User').where('user_email', email);
      if (user) {
        const denounces = await knex('Denounce').where('User_user_idRec', user[0].user_id);
        return res.status(201).json(denounces);
      }
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async searchDenounceOffer(req, res) {
    try {
      const { ofrId } = req.params; 

      const offer = await knex('Offer').where('ofr_id', ofrId);
      if (offer) {
        const denounces = await knex('Denounce').where('Offer_ofr_id', offer[0].ofr_id);
        return res.status(201).json(denounces);
      }
      return res.status(401).json({msg : "This offer does not exists."});
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async searchDenounceById(req, res) {
    try {
      const {id} = req.params;

      let consult;
      let result;
     
      consult = await knex("Denounce").where("den_id", id).join("User", "User_user_idRec", "user_id");
      result = {
        den_id: consult[0].den_id,
        den_reason: consult[0].den_reason,
        den_content: consult[0].den_content,
        den_date: consult[0].den_date,
        den_status: consult[0].den_status,
        den_gravity: consult[0].den_gravity,
        adm_assigned: consult[0].adm_assigned,
        User_user_idEnv: consult[0].User_user_idEnv,
        Offer_ofr_id: consult[0].Offer_ofr_id,
        user_id: consult[0].user_id,
        user_email: consult[0].user_email,
        user_nota: consult[0].user_nota,
        user_name: consult[0].user_name,
        user_img: consult[0].user_img,
      }

      if(consult != "") return res.status(201).json(result);
      return res.status(401).json("There is no such report!");
    }
    catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para criar uma nova denúncia
  async createDenounce(req, res) {
    try {
      const { den_content, User_user_idRec, User_user_idEnv, Offer_ofr_id, den_reason, den_gravity } = req.body;

      const userExists = await knex('User').where('user_id', User_user_idRec);
      const now = new Date();
      const den_date = now;
      
      if (userExists != "") {
        await knex('Denounce').insert({
          den_content,
          den_date,
          den_gravity,
          den_reason,
          User_user_idRec,
          User_user_idEnv,
          Offer_ofr_id
        });

        return res.status(201).json({ message: 'Denúncia criada com sucesso.' });
      } else {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para atualizar uma denúncia existente
  async updateDenounce(req, res) {
    try {
      const {id} = req.params;
      const { den_content, den_reason } = req.body;

      const denounceExists = await knex('Denounce').where('den_id', id);
      if (denounceExists) {
        await knex('Denounce').update({
          den_content,
          den_reason
        }).where('den_id', id);

        return res.status(201).json({ message: 'Denúncia atualizada com sucesso.' });
      } else {
        return res.status(401).json({ message: 'Denúncia não encontrada.' });
      }
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para excluir uma denúncia
  async deleteDenounce(req, res) { 
    try {
      const { id } = req.params;

      const denounceExists = await knex('Denounce').where('den_id', id);
      if (denounceExists) {
        await knex('Denounce').del().where('den_id', id);

        return res.status(201).json({ message: 'Denúncia excluída com sucesso.' });
      } else {
        return res.status(401).json({ message: 'Denúncia não encontrada.' });
      }
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
