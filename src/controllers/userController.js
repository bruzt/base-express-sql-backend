const UserModel = require('../models/UserModel');

module.exports = {

    async index(req, res){

        try {
            
            const users = await UserModel.findAll();

            users.forEach( (user) => user.password = undefined);
        
            return res.json(users);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async show(req, res){

        const { id } = req.params;

        if(isNaN(id)){
            return res.status(400).json({ error: 'id referance must be a number' })
        }

        try {
            
            const user = await UserModel.findByPk(id);

            if(! user) return res.status(400).json({ error: 'user not found'});

            user.password = undefined;
        
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { name, email, age, password } = req.body;

        if(!name || !email || !age || !password){
            return res.status(400).json({ error: 'one or more fields are missing' });
        }
        
        try {
            
            const user = await UserModel.create({ name, email, age, password });
    
            user.password = undefined;

            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req, res){

        const { id } = req.params;

        if(isNaN(id)){
            return res.status(400).json({ error: 'id referance must be a number' })
        }

        const { name, email, age, password } = req.body;

        try {

            const [ updated ] = await UserModel.update({ name, email, age, password }, { where: { id } });
            
            if(updated === 0) return res.status(400).json({ error: 'user not found'});

            return res.sendStatus(200);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        if(isNaN(id)){
            return res.status(400).json({ error: 'id referance must be a number' })
        }

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


