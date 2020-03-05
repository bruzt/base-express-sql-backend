const { Op } = require('sequelize');

const UserModel = require('../models/User');

module.exports = {

    async show(req, res){

        const iLike = (process.env.NODE_ENV === 'test') ? Op.like : Op.iLike;

        try {

            const user = await UserModel.findAll({
                //attributes: ['name', 'email'],                
                where: {
                    email: { [iLike]: '%'},
                },
                include: [ 
                    {   // INNER JOIN
                        association: 'addresses',
                        where: {
                            street: { [iLike]: '%' } 
                        }
                    },
                    {   
                        association: 'techs',
                        where: {
                            name: { [iLike]: '%' }
                        },
                        required: false, // LEFT JOIN
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