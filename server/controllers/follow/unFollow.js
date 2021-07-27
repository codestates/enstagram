const { Users } = require('../../models');

module.exports = async (req, res) => {

    const myInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    const targetInfo = await Users.findOne({
        where: { id: req.body.target_id }
    });

    if (myInfo) {

        if (myInfo.dataValues.follower_id !== 0) {

            let result = [];

            result = myInfo.dataValues.follower_id.filter(el => {
                return el !== req.body.target_id
            });

            await Users.update({ follower_id: result }, {
                where: { id: myInfo.dataValues.id }
            });

            res.status(200).json({ message: "언팔로우 성공" });
        } else {
            res.status(200).json({ message: "현재 팔로우 중인 사람이 없습니다" });
        }

    } else {
        res.status(200).json({ message: "유저 정보를 불러오지 못했습니다" });
    }
};