const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfos = await Users.findAll();

    const userArr = userInfos.map(el => {
        delete userInfos.dataValues.password;
        return el.dataValues;
    });

    res.status(200).json(userArr);
};