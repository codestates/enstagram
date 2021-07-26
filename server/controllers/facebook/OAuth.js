const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { email: req.query.email }
    });

    if (!userInfo) {
        res.status(200).json({ message: "일치하는 유저정보가 없습니다" });
    } else {

        delete userInfo.dataValues.password;

        res.status(200).json({
            data: userInfo,
            message: "로그인 성공"
        });
    }
};