const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    if (userInfo) {

        const post = {
            user_id: req.body.user_id,
            content: req.body.content,
            pictures: req.body.pictures,
        }

        await Posts.create(post)
            .then(async (value) => {

                await Users.update({ post_id: value.dataValues.id }, {
                    where: { id: post.user_id }
                });

                res.status(200).json({
                    data: post,
                    message: "포스트 생성 성공"
                });
            });

    } else {
        res.status(200).json({ message: "일치하는 유저 정보를 찾지 못했습니다" });
    }

};