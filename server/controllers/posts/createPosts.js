const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const post = {
        user_id: req.body.user_id,
        content: req.body.content,
        pictures: req.body.pictures,
    }

    await Posts.create(post)
        .then(res => {
            const userInfo = await Users.findOne({
                where: { id: user_id }
            });

            if (userInfo) {

                const postArr = userInfo.dataValues.post_id;

                Users.create({
                    post_id: [...postArr, res.dataValues.id]
                });

                res.status(200).json({
                    data: post,
                    message: "포스트 생성 성공"
                });

            } else {
                res.status(200).json({ message: "포스트 생성 도중 일치하는 유저 정보를 찾지못했습니다" });
            }
        });
};