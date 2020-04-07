const crypto = require('crypto');

const UserModel = require('../models/UserModel');
const mailer = require('../services/mailer');

module.exports = {

    store: async (req, res) => {

        const { email } = req.body;

        try {

            const user = await UserModel.findOne({ where: { email }});

            if(!user) return res.status(400).json({ error: 'user not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const expires = new Date();
            expires.setHours(expires.getHours() + 1);

            user.reset_password_token = token;
            user.reset_password_expires = expires;

            await user.save();

            await mailer.sendMail({
                from: 'donotreply@companydomain.com',
                to: email,
                subject: 'Reset Password',
                template: 'resetPassword',
                context: { token }
            });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    },

    update: async (req, res) => {

        const { token, newPassword } = req.body;

        try {

            const user = await UserModel.findOne({ where: { reset_password_token: token }});

            if(!user) return res.status(400).json({ error: 'invalid token' });

            if(user.reset_password_expires > Date.now()) return res.status(400).json({ error: 'token expired' });

            user.password = newPassword;

            await user.save();

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}