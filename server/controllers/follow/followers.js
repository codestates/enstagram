const { Users } = require('../../models');

module.exports = async (req, res) => {

    const myInfo = await Users.findOne({
        where: { id: req.body.my_id }
    });

    const targetInfo = await Users.findOne({
        where: { id: req.body.target_id }
    });

    if (myInfo) {
        if (myInfo.dataValues.follower_id.length !== 0) {
            await Users.update({ follower_id: [...myInfo.dataValues.follower_id, targetInfo.dataValues.id] }, {
                where: {
                    id: myInfo.dataValues.id
                }
            });
        } else {
            await Users.update({ follower_id: [targetInfo.id] }, {
                where: {
                    id: myInfo.dataValues.id
                }
            });
        }

        if (targetInfo.dataValues.following_id.length !== 0) {
            await Users.update({ following_id: [...targetInfo.dataValues.following_id, userInfo.dataValues.id] }, {
                where: {
                    id: targetInfo.dataValues.id
                }
            });
        } else {
            await Users.update({ following_id: [userInfo.dataValues.id] }, {
                where: {
                    id: targetInfo.dataValues.id
                }
            });
        }

        res.status(200).json({ message: "팔로워 데이터 저장 성공" });
    } else {
        res.status(200).json({ message: "유저 정보를 불러오지 못했습니다" });
    }
};