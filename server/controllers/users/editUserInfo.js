const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    if (userInfo) {

        const result = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }

        Users.update(result, {
            where: userInfo.dataValues.id
        });

        res.status(200).json({
            data: result,
            message: "유저 데이터 변경 성공"
        })
    } else {
        res.status(200).json({
            message: "일치하는 유저 ID 가 없습니다"
        })
    }
};