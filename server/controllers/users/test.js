const { Users, Test } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findAll();
    const testInfo = await Test.findAll({
        attributes: ['array']
    });

    const userArr = userInfo.map(el => {
        delete el.dataValues.password;
        return el.dataValues;
    });


    res.status(200).json(testInfo[0].array);
};