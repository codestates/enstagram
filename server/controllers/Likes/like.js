const { Users, Posts, Likes } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    const postInfo = await Posts.findOne({
        where: { id: req.body.post_id }
    });

    const likeInfos = await Likes.findOne({
        where: { user_id: req.body.user_id }
    });

    const likePost = await Likes.findOne({
        where: { post_id: req.body.post_id }
    });

    if (likeInfos) {

        if (likeInfos.dataValues.value === true) {

            await Likes.update({ value: false }, {
                where: { id: likeInfos.dataValues.id }
            })
                .then(value => {
                    res.status(200).json({
                        data: {
                            user_id: userInfo.dataValues.id,
                            post_id: postInfo.dataValues.id,
                            value: value.dataValues.value
                        },
                        message: "좋아요 정보 설정 완료"
                    });
                });

        } else if (likeInfos.dataValues.value === false) {

            await Likes.update({ value: true }, {
                where: { id: likeInfos.dataValues.id }
            })
                .then(value => {
                    res.status(200).json({
                        data: {
                            user_id: userInfo.dataValues.id,
                            post_id: postInfo.dataValues.id,
                            value: value.dataValues.value
                        },
                        message: "좋아요 정보 설정 완료"
                    });
                });

        }

    } else if (!likeInfos) {

        console.log("왜 자꾸 여기로 들어와????????????????");

        const like = {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            value: true
        };

        await Likes.create(like)
            .then(async (value) => {

                if (userInfo.dataValues.like_id.length !== 0) {
                    await Users.update({ like_id: [...userInfo.dataValues.like_id, value.dataValues.id] }, {
                        where: { id: like.user_id }
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
                    data: {
                        user_id: userInfo.dataValues.id,
                        post_id: postInfo.dataValues.id,
                        value: value.dataValues.value
                    },
                    message: "좋아요 정보 설정 완료"
                });
            });
    }
};