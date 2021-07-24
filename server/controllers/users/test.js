const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findAll();

    const userArr = userInfo.map(el => {
        delete el.dataValues.password;
        return el.dataValues;
    });

    // 갑자기 왜 이러는거야??

    res.status(200).json(userArr);
};