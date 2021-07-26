const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userName = await Users.findOne({
        where: { username: req.body.username }
    });

    const userEmail = await Users.findOne({
        where: { email: req.body.email }
    });

    if (!userName && !userEmail) {

        const userInfo = await Users.findOne({
            where: { id: req.body.user_id }
        });

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
        });

    } else if (userName) {
        res.status(200).json({
            message: "이미 존재하는 username 입니다"
        });
    } else if (userEmail) {
        res.status(200).json({
            message: "이미 존재하는 email 입니다"
        });
    } else {
        res.status(200).json({
            message: "일치하는 user 정보를 찾을 수 없습니다"
        });
    }
};