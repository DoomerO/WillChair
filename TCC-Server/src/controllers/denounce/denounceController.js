const knex = require('../../database/database');

module.exports = {
  // Função para buscar todas as denúncias
  async searchdenounce(req, res) { 
    try {
      const result = await knex('denounce');
      return res.status(201).json(result);
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para buscar denúncias por email de usuário
  async searchdenounceByEmail(req, res) {
    try {
      const { email } = req.params; 

      const user = await knex('user').where('user_email', email);
      if (user) {
        const denounces = await knex('denounce').where('User_user_id', user.user_id);
        return res.status(201).json(denounces);
      }
    } catch(error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Função para criar uma nova denúncia
  async createDenounce(req, res) {
    try {
      const { den_content, den_date, User_user_id, Offer_ofr_id } = req.body;

      const userExists = await knex('User').where('user_id', User_user_id);
      const offerExists = await knex('Offer').where('ofr_id', Offer_ofr_id);
      
      if (userExists && offerExists) {
        await knex('Denounce').insert({
          den_content,
          den_date,
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
      const { den_content, den_date } = req.body;

      const denounceExists = await knex('Denounce').where('den_id', id);
      if (denounceExists) {
        await knex('Denounce').update({
          den_content,
          den_date
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