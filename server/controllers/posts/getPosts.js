const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.id }
    });

    if (userInfo) {

        const postInfo = userInfo.dataValues.post_id;

        Promise.all(
            postInfo.map(async el => {

                const postInfos = await Posts.findOne({
                    where: { id: el }
                });

                console.log("postInfosssssssssssssssss", postInfos.dataValues);

                return postInfos.dataValues;
            })
        )
            .then(result => {
                res.status(200).json(result);
            });
    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};