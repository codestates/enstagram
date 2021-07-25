const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { email: req.body.email }
    });

    if (!userInfo) {
        res.status(200).json({ message: "일치하는 유저정보가 없습니다" });
    } else {
        res.status(200).json(userInfo);
    }
};