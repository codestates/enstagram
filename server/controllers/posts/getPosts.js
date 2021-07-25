const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.id }
    });

    if (userInfo) {

        const followers = userInfo.dataValues.follower_id;

        const followerInfo = followers.map(async (el) => {

            const postInfo = await Posts.findOne({
                where: { user_id: el }
            });

            if (postInfo) {
                console.log("postInfooooooooooo", postInfo);
                return postInfo.dataValues;
            } else {
                res.status(200).json({ message: "상대의 포스트 데이터가 없습니다." })
            }

        })

        res.status(200).json({
            data: followerInfo,
            message: "데이터 불러오기 성공"
        });

    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};