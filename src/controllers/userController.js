const UserModel = require('../models/User');

module.exports = {

    async index(req, res){

        try {
            
            const users = await UserModel.findAll();
        
            return res.json(users);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async show(req, res){

        const { id } = req.params;

        try {
            
            const user = await UserModel.findByPk(id);

            if(! user) return res.status(400).json({ error: 'user not found'});
        
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { name, email, age } = req.body;
        
        try {
            
            const user = await UserModel.create({ name, email, age })
    
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req, res){

        const { id } = req.params;

        const { name, email, age } = req.body;

        try {

            const [ updated ] = await UserModel.update({ name, email, age }, { where: { id } });
            
            if(updated === 0) return res.status(400).json({ error: 'user not found'});

            return res.sendStatus(200);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        try {

            const user = await UserModel.destroy({ where: { id } });

            if(user === 0) return res.status(400).json({ error: 'user not found'});

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}


