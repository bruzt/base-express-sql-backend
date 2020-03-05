const { Op } = require('sequelize');

const UserModel = require('../models/User');

module.exports = {

    async show(req, res){

        try {

            const user = await UserModel.findAll({
                //attributes: ['name', 'email'],                
                where: {
                    email: { [Op.like]: '%'},
                },
                include: [ 
                    {   // INNER JOIN
                        association: 'addresses',
                        where: {
                            street: { [Op.like]: '%' } 
                        }
                    },
                    {   
                        association: 'techs',
                        where: {
                            name: { [Op.like]: '%' }
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