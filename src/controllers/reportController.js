const { Op } = require('sequelize');

const UserModel = require('../models/UserModel');

module.exports = {

    async show(req, res){

        const iLike = (process.env.NODE_ENV === 'test') ? Op.like : Op.iLike;

        try {

            const user = await UserModel.findAll({
                attributes: ['id', 'name', 'email'],            
                where: {
                    email: { [iLike]: '%'},
                },
                include: [ 
                    {   
                        association: 'addresses', // INNER JOIN
                        attributes: ['id', 'zipcode', 'street', 'number'],            
                        where: {
                            street: { [iLike]: '%' } 
                        }
                    },
                    {   
                        association: 'techs',
                        required: false, // LEFT JOIN
                        attributes: ['id', 'name'], 
                        through: { attributes: [] },    
                        where: {
                            name: { [iLike]: '%' }
                        }
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