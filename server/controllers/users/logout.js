const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfos = await Users.findOne({
        where: { id: req.body.user_id }
    });

    if (userInfos) {
        res.status(200).json({ message: "로그아웃 성공" });
    } else {
        res.status(200).json({ message: "해당 유저의 정보를 찾지 못했습니다" });
    }
};