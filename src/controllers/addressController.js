const Users_mModel = require('../models/Users_m');
const Adresses_mModel = require('../models/Addresses_m');

module.exports = {

    async show(req, res){

        const { user_id } = req.params;

        try {

            const user = await Users_mModel.findByPk(user_id, {
                include: { association: 'addresses' }
            });

            /*if(! user) return res.status(400).json({ error: 'User not found' });
            
            const address = await Adresses_mModel.findAll({ where: { user_id }});*/
        
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { user_id } = req.params;

        const { zipcode, street, number } = req.body;
        
        try {

            const user = await Users_mModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'User not found' });       
            
            const address = await Adresses_mModel.create({ user_id, zipcode, street, number });
    
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    /*async update(req, res){

        const { id } = req.params;

        const { user_id, zipcode, street, number } = req.body;

        try {

            const user = await Adresses_mModel.update({ user_id, zipcode, street, number }, { where: { id }, returning: true });

            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        try {

            await Adresses_mModel.destroy({ where: { id } });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }*/
}