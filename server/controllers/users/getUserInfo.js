const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.user_id }
    });

    if (userInfo) {

        const result = {
            id: userInfo.dataValues.id,
            username: userInfo.dataValues.username,
            profilePhoto: userInfo.dataValues.profilePhoto
        }

        res.status(200).json({
            data: result,
            message: "유저 데이터 불러오기 성공"
        })
    } else {
        res.status(200).json({
            message: "일치하는 유저 ID 가 없습니다"
        })
    }
};