const Dev = require('../model/Dev')

module.exports = {
    async store(req, res) {
        try {
            const { devId } = req.params;
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            // if (!targetDev) {
            //     return res.status(400).json({ error: 'Dev not exist'});
            // }

            return res.json({ ok : true});
        } catch (error){
            //res.status(400)
            return res.status(400).json({ error: 'Dev not exist'});
        }
    }
};