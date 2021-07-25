const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.id }
    });

    if (userInfo) {

        const postInfo = userInfo.dataValues.post_id;

        const postResult = Promise.all(
            postInfo.map(el => {

                const postInfos = Posts.findOne({
                    where: { id: el }
                });

                return postInfos.dataValues;
            })
        );

        console.log("postResultssssssssssssssssss", postResult);

        res.status(200).json(postResult);

    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};