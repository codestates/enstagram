const { Users, Posts, Comments, Likes } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    if (userInfo) {

        const like = {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            value: true,
        }

        const postInfo = await Posts.findOne({
            where: { id: req.body.post_id }
        });

        await Likes.create(like)
            .then(async (value) => {

                if (userInfo.dataValues.like_id.length !== 0) {
                    await Users.update({ like_id: [...userInfo.dataValues.like_id, value.dataValues.id] }, {
                        where: { id: like.like_id }
                    });
                } else {
                    await Users.update({ like_id: [value.dataValues.id] }, {
                        where: { id: like.user_id }
                    });
                }

                if (postInfo.dataValues.like_id.length !== 0) {
                    await Posts.update({ like_id: [...postInfo.dataValues.like_id, value.dataValues.id] }, {
                        where: { id: like.post_id }
                    });
                } else {
                    await Posts.update({ like_id: [value.dataValues.id] }, {
                        where: { id: like.post_id }
                    });
                }

                res.status(200).json({
                    data: like,
                    message: "좋아요 완료"
                });
            });

    } else {
        res.status(200).json({ message: "일치하는 유저 정보를 찾지 못했습니다" });
    }

};