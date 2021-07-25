const { Users } = require('../../models');

module.exports = async (req, res) => {


    console.log("req.params 의 정보 ========>", req.params);

    const userInfo = await Users.findOne({
        where: { email: req.params.email }
    });

    if (!userInfo) {
        res.status(200).json({ message: "일치하는 유저정보가 없습니다" });
    } else {

        const { dataValues: { id, name, username, email, createdAt, updatedAt } } = userInfo;

        res.status(200).json({
            data: {
                id,
                name,
                username,
                email,
                createdAt,
                updatedAt
            },
            message: "로그인 성공"
        });
    }
};