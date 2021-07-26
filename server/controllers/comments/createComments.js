const { Users, Posts, Comments } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.body.user_id }
    });

    if (userInfo) {

        const comment = {
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        }

        const postInfo = await Posts.findOne({
            where: { id: req.body.post_id }
        });

        await Comments.create(comment)
            .then(async (value) => {

                if (userInfo.dataValues.comment_id.length !== 0) {
                    await Users.update({ comment_id: [...userInfo.dataValues.comment_id, value.dataValues.id] }, {
                        where: { id: comment.user_id }
                    });

                } else {
                    await Users.update({ comment_id: [value.dataValues.id] }, {
                        where: { id: comment.user_id }
                    });
                }

                if (postInfo.dataValues.comment_id.length !== 0) {
                    await Posts.update({ comment_id: [...postInfo.dataValues.comment_id, value.dataValues.id] }, {
                        where: { id: comment.post_id }
                    });
                } else {
                    await Posts.update({ comment_id: [value.dataValues.id] }, {
                        where: { id: comment.post_id }
                    });
                }

                res.status(200).json({
                    data: comment,
                    message: "코멘트 생성 성공"
                });
            });

    } else {
        res.status(200).json({ message: "일치하는 유저 정보를 찾지 못했습니다" });
    }

};