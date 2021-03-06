const Dev = require('../model/Dev')

module.exports = {
    async store(req, res) {
        try {
            const { user } = req.headers;
            const { devId } = req.params;

            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            loggedDev.likes.push(targetDev._id);

            if(targetDev.likes.includes(loggedDev._id)){
                console.log("MATH");
            }

            await loggedDev.save();

            return res.json({ loggedDev});
        } 
        catch (error){
            return res.status(400).json({ error: 'Dev not exist'});
        }
    }    
};