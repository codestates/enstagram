const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const postInfo = await Users.findOne({
        where: {}
    });

    const userArr = userInfo.map(el => {
        delete el.dataValues.password;
        return el.dataValues;
    });


    res.status(200).json(userArr);
};