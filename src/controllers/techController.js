const UserModel = require('../models/UserModel');
const TechModel = require('../models/TechModel');

module.exports = {

    async index(req, res){

        const { user_id } = req.params;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { association: 'techs', through: { attributes: [] } }
            });

            if(! user) return res.status(400).json({ error: 'User not found' });
        
            return res.json(user.techs);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },
    
    async store(req, res){

        const { user_id } = req.params;

        const { name } = req.body;
        
        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'User not found' });       
            
            const [ tech ] = await TechModel.findOrCreate({
                where: { name }
            });

            await user.addTech(tech);  
    
            return res.json(tech);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req, res){

        const { user_id, id } = req.params;

        const { name } = req.body;

        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: 'User not found' });       
            
            const [ tech ] = await TechModel.update({ name }, { where: { id } });
    
            return res.json(tech);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { user_id, id } = req.params;

        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ error: "user not found" });

            const tech = await TechModel.findByPk(id);

            await user.removeTech(tech);  

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}