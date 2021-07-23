const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findAll();

    res.status(200).json(userInfo[0].dataValues);
};