
const User_mModel = require('../models/Users_m');

module.exports = {

    async index(req, res){

        try {
            
            const users = await User_mModel.findAll();
        
            return res.json(users);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async show(req, res){

        const { id } = req.params;

        try {
            
            const user = await User_mModel.findByPk(id);
        
            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { name, email, age } = req.body;
        
        try {
            
            const user = await User_mModel.create({ name, email, age })
    
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

            const user = await User_mModel.update({ name, email, age }, { where: { id }, returning: true });

            return res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        try {

            await User_mModel.destroy({ where: { id } });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}


