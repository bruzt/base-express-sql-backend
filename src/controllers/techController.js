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

            const tech = await TechModel.findByPk(tech_id);

            if(!tech) return res.status(400).json({ error: 'tech not found' });

            return res.json(tech);
            
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

            const [ updated ] = await TechModel.update({ name }, { where: { id } });

            if(updated == 0) return res.status(400).json({ error: 'tech not found '});
    
            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    },

    async destroy(req, res){

        const { id } = req.params;

        try {

            const deleted = await TechModel.destroy({ where: { id } });

            if(deleted == 0) return res.status(400).json({ error: 'tech not found'});

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal error" });
        }
    }
}