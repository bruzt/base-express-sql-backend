const UserModel = require('../models/UserModel');
const AddressModel = require('../models/AddressModel');

module.exports = {

    async index(req, res){

        const { user_id } = req.params;
        
        if(isNaN(user_id)) return res.status(400).json({ error: 'id referance must be a number' });

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

        if(isNaN(user_id)) return res.status(400).json({ error: 'id referance must be a number' });

        const { zipcode, street, number } = req.body;

        if(!zipcode || !street || !number) return res.status(400).json({ error: 'one or more fields are missing' });
        
        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'User not found' });       
            
            const address = await AddressModel.create({ user_id, zipcode, street, number });
    
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req, res){

        const { user_id, id } = req.params;

        if(isNaN(user_id) || isNaN(id)) return res.status(400).json({ error: 'id referance must be a number' });

        const { zipcode, street, number } = req.body;

        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: "user not found" });

            const [ address ] = await AddressModel.update({ user_id, zipcode, street, number }, { where: { id } });

            if(address == 0) return res.status(400).json({ error: "address not found"});
            
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { user_id, id } = req.params;

        if(isNaN(user_id) || isNaN(id)) return res.status(400).json({ error: 'id referance must be a number' });

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { association: 'addresses' }
            });

            if(! user) return res.status(400).json({ error: "user not found" });

            const address = user.addresses.filter(address => address.id == id);
            
            if(address.length === 0) return res.status(400).json({ error: "address not found" });

            AddressModel.destroy({ where: { id }});

            return res.sendStatus(200);
         
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}