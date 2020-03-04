const UserModel = require('../models/User');
const AdressModel = require('../models/Address');

module.exports = {

    async index(req, res){

        const { user_id } = req.params;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { association: 'addresses' }
            });

            if(! user) return res.status(400).json({ error: 'User not found' });
        
            return res.json(user.addresses);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { user_id } = req.params;

        const { zipcode, street, number } = req.body;
        
        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'User not found' });       
            
            const address = await AdressModel.create({ user_id, zipcode, street, number });
    
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req, res){

        const { user_id, id } = req.params;

        const { zipcode, street, number } = req.body;

        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: "user not found" });

            const [ address ] = await AdressModel.update({ user_id, zipcode, street, number }, { where: { id } });

            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { user_id, id } = req.params;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { association: 'addresses' }
            });

            if(! user) return res.status(400).json({ error: "user not found" });

            const address = user.addresses.filter(address => address.id == id);
            
            if(address.length === 0) return res.status(400).json({ error: "address not found" });

            AdressModel.destroy({ where: { id }});

            return res.sendStatus(200);
         
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}