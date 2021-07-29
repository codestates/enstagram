const { Users } = require('../../models');

module.exports = async (req, res) => {

    const myInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    const targetInfo = await Users.findOne({
        where: { id: req.body.target_id }
    });

    if (req.body.user_id === req.body.target_id) {
        res.status(400).json({ message: "user 와 target 의 ID 가 같습니다. 확인 후 재요청 하십시오" });
    }

    console.log("user_id:::::::::", req.body.user_id);
    console.log("target_id::::", req.body.target_id);

    if (myInfo) {

        if (myInfo.dataValues.follower_id.indexOf(req.body.target_id) > -1) {

            const followArray = myInfo.dataValues.follower_id.filter(el => {
                return el !== req.body.target_id;
            });

            const followingArray = targetInfo.dataValues.following_id.filter(el => {
                return el !== req.body.user_id;
            });

            await Users.update({ follower_id: followArray }, {
                where: { id: myInfo.dataValues.id }
            });

            await Users.update({ following_id: followingArray }, {
                where: { id: targetInfo.dataValues.id }
            });

            res.status(200).json({ message: "언팔로우 성공" });

        } else {
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
                await Users.update({ following_id: [...targetInfo.dataValues.following_id, myInfo.dataValues.id] }, {
                    where: {
                        id: targetInfo.dataValues.id
                    }
                });
            } else {
                await Users.update({ following_id: [myInfo.dataValues.id] }, {
                    where: {
                        id: targetInfo.dataValues.id
                    }
                });
            }

            res.status(200).json({ message: "팔로우 성공" });
        }

    } else {
        res.status(200).json({ message: "유저 정보를 불러오지 못했습니다" });
    }
};