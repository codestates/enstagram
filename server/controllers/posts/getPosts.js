const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.user_id }
    });

    if (userInfo) {

        const postInfo = userInfo.dataValues.post_id;

        Promise.all(postInfo.map(el => {

            const postInfos = Posts.findOne({
                where: { id: el }
            });

            if (postInfos) {
                return postInfos;
            } else {
                res.status(200).json({ message: "일치하는 포스트 데이터가 없습니다" });
            }
        }))
            .then(result => {
                res.status(200).json({
                    data: result.reverse(),
                    message: "post 데이터 불러오기 성공"
                })
            });
    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};