const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.user_id }
    });

    if (userInfo) {

        res.status(200).json({
            data: userInfo.dataValues.following_id,
            message: "팔로잉 데이터 요청 성공"
        })

    } else {
        res.status(200).json({ message: "해당 유저 정보가 존재하지 않습니다" });
    }
};