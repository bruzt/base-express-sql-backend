const { Op } = require('sequelize');

const UserModel = require('../models/UserModel');

module.exports = {

    async show(req, res){

        const iLike = (process.env.NODE_ENV === 'test') ? Op.like : Op.iLike;

        let { email, street, tech } = req.body;

        if(! email || email == '*') email = '%';
        if(! street || street == '*') street = '%';
        if(! tech || tech == '*') tech = '%';

        try {

            const user = await UserModel.findAll({
                attributes: ['id', 'name', 'email'],            
                where: {
                    email: { [iLike]: `%${email}%`},
                },
                include: [ 
                    {   
                        association: 'addresses', // INNER JOIN
                        attributes: ['id', 'zipcode', 'street', 'number'],            
                        where: {
                            street: { [iLike]: `%${street}%` } 
                        }
                    },
                    {   
                        association: 'techs',
                        required: false, // LEFT JOIN
                        attributes: ['id', 'name'], 
                        through: { attributes: [] },    
                        where: {
                            name: { [iLike]: `%${tech}%` }
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