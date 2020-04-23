const express = require('express');
const { Op } = require('sequelize');

const UserModel = require('../models/UserModel');

/**
 * @callback ReqRes
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = {

    /** @type {ReqRes} */
    async show(req, res){

        const iLike = (process.env.NODE_ENV === 'test') ? Op.like : Op.iLike;

        let { email, street, tech } = req.body;

        if(!email || email == '*') email = '%';
        if(!street || street == '*') street = '%';
        if(!tech || tech == '*') tech = '%';

        try {

            const user = await UserModel.findAll({
                attributes: ['id', 'name', 'email'],            
                where: {
                    email: { [iLike]: `%${email}%`},
                },
                include: [ 
                    {   
                        association: 'addresses',
                        attributes: ['id', 'zipcode', 'street', 'number'],            
                        where: {
                            street: { [iLike]: `%${street}%` } 
                        },
                        required: false, // true = INNER JOIN, false = LEFT JOIN, default = true
                    },
                    {   
                        association: 'techs',
                        attributes: ['id', 'name'], 
                        through: { attributes: [] },    
                        where: {
                            name: { [iLike]: `%${tech}%` }
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