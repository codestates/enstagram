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

            let index = Number.MIN_SAFE_INTEGER;

            myInfo.dataValues.follower_id.map((el, idx) => {
                if (el === req.body.target_id) {
                    index = idx;
                }
            })

            if (index > -1) {
                myInfo.dataValues.follower_id.splice(index, 1);
            }
        }

        res.status(200).json({ message: "언팔로우 성공" });
    } else {
        res.status(200).json({ message: "유저 정보를 불러오지 못했습니다" });
    }
};