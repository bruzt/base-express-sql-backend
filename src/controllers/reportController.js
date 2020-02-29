const { Op } = require('sequelize');

const UserModel = require('../models/User');

module.exports = {

    async show(req, res){

        try {

            const user = await UserModel.findAll({
                //attributes: ['name', 'email'],                
                where: {
                    email: { [Op.iLike]: '%@rocketseat.com.br'},
                },
                include: [
                    {
                        association: 'addresses',
                        where: {
                            street: { [Op.iLike]: 'rua%' } 
                        }
                    },
                    {
                        association: 'techs',
                        where: {
                            name: { [Op.iLike]: '%react%' }
                        },
                        required: false,
                    }
                ]
            });
            
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}