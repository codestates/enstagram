const { User } = require('../../models');

//! 테스트

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username, email: req.body.email }
    });

    res.status(200).json({ userInfo });
};