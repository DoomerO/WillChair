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
        const denounces = await knex('Denounce').where('User_user_id', user[0].user_id);
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

  // Função para criar uma nova denúncia
  async createDenounce(req, res) {
    try {
      const { den_content, User_user_id, Offer_ofr_id, den_reason } = req.body;

      const userExists = await knex('User').where('user_id', User_user_id);
      const offerExists = await knex('Offer').where('ofr_id', Offer_ofr_id);
      const now = new Date();
      const den_date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      
      if (userExists && offerExists) {
        await knex('Denounce').insert({
          den_content,
          den_date,
          den_reason,
          User_user_id,
          Offer_ofr_id
        });

        return res.status(201).json({ message: 'Denúncia criada com sucesso.' });
      } else {
        return res.status(401).json({ message: 'Usuário ou oferta não encontrados.' });
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
