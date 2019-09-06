const axios = require('axios');
const Dev = require('../model/Dev')

module.exports = {

    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [                                     //deve possuir as características ao mesmo tempo e não apenas uma delas
                { _id: { $ne: user }},                    //not equal
                { _id: { $nin: loggedDev.likes }},        //not in
                { _id: { $nin: loggedDev.dislikes }},       //not in
            ],                                  
        })

        return res.json(users);
    },
    async store(req, res) {
        const {username} = req.body;

    const userExists = await Dev.findOne({ user : username });

    if(userExists){
        return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url:avatar} = response.data

    const devData = await Dev.create({
        name,
        user: username,
        bio,
        avatar        
    })

        return res.json(devData);
    }
}