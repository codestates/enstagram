const { Users } = require('../../models');

module.exports = async (req, res) => {

    const myInfo = await Users.findOne({
        where: { id: req.body.my_id }
    });

    const targetInfo = await Users.findOne({
        where: { id: req.body.target_id }
    });

    if (myInfo) {
        if (myInfo.dataValues.followers_id.length !== 0) {
            await Users.update({ followers_id: [...myInfo.dataValues.followers_id, targetInfo.id] }, {
                where: {
                    id: myInfo.id
                }
            });
        } else {
            await Users.update({ followers_id: [targetInfo.id] }, {
                where: {
                    id: myInfo.id
                }
            });
        }

    } else {
        res.status(200).json({ message: "유저 정보를 불러오지 못했습니다" });
    }
};