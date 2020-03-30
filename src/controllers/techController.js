const TechModel = require('../models/TechModel');

module.exports = {

    async index(req, res){

        try {

            const techs = await TechModel.findAll();

            return res.json(techs);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async show(req, res){

        const { tech_id } = req.params;

        try {

            const techs = await TechModel.findByPk(tech_id);

            return res.json(techs);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async store(req, res){

        const { name } = req.body;

        try {

            const tech = await TechModel.create({ name });

            return res.json(tech);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async update(req,res){

        const { id } = req.params;

        const { name } = req.body;

        try {

            const [ tech ] = await TechModel.update({ name }, { where: { id } });
    
            return res.json(tech);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        try {

            await TechModel.destroy({ where: { id } });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}