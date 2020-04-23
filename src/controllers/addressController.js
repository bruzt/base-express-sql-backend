const express = require('express');

const UserModel = require('../models/UserModel');
const AddressModel = require('../models/AddressModel');

/**
 * @callback ReqRes
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = {

    /** @type {ReqRes} */
    async index(req, res){
        
        const { id } = req.tokenPayload;
        
        try {

            const user = await UserModel.findByPk(id, {
                include: { association: 'addresses' }
            });

            if(! user) return res.status(400).json({ error: 'user not found' });
        
            return res.json(user.addresses);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    /** @type {ReqRes} */
    async store(req, res){
        
        const user_id = req.tokenPayload.id;

        const { zipcode, street, number } = req.body;
        
        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'user not found' });       
            
            const address = await AddressModel.create({ user_id, zipcode, street, number });
    
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    /** @type {ReqRes} */
    async update(req, res){

        const id = req.params.id;
        const user_id = req.tokenPayload.id;

        const { zipcode, street, number } = req.body;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: [{
                    association: 'addresses',
                    where: { id },
                    required: false
                }]
            });

            if(! user) return res.status(400).json({ error: "user not found" });
            if(user.addresses.length < 1) return res.status(400).json({ error: "address not found" });

            await AddressModel.update({ zipcode, street, number }, { where: { id } });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    /** @type {ReqRes} */
    async destroy(req, res){

        const id = req.params.id;
        const user_id = req.tokenPayload.id;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { 
                    association: 'addresses',
                    where: { id },
                    required: false
                }
            });

            if(! user) return res.status(400).json({ error: "user not found" });
            if(user.addresses.length < 1) return res.status(400).json({ error: "address not found" });

            AddressModel.destroy({ where: { id }});

            return res.sendStatus(200);
         
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}