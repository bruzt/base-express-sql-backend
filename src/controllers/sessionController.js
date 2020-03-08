
const UserModel = require('../models/UserModel');

module.exports = {

    async store(req, res){

        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ error: 'one or more fields are missing' });

        try {
            
            const user = await UserModel.findOne({ where: { email }});
    
            if(! user) return res.status(400).send({ error: "user or password not found" });
    
            const comparePassword = await user.checkPassword(password);
    
            if(! comparePassword) return res.status(400).json({ error: "user or password not found" });
    
            user.password = undefined;

            return res.json({ 
                user, 
                token: user.generateToken() 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}