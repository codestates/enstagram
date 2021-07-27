const { Users, Posts, Likes, Comments } = require("../../models");

module.exports = async (req, res) => {

    const commentInfo = await Comments.findOne({
        where: { id: req.body.comment_id }
    });

    if (commentInfo) {

        let result = [];

        const userInfo = await Users.findOne({
            where: { id: commentInfo.dataValues.user_id }
        });

        result = userInfo.dataValues.comment_id.filter(el => {
            return el !== req.body.comment_id
        });

        await Comments.destroy({
            where: { id: commentInfo.dataValues.id }
        });

        await Users.update({ comment_id: result }, {
            where: { id: commentInfo.dataValues.user_id }
        });

        await Posts.update({ comment_id: result }, {
            where: { id: commentInfo.dataValues.post_id }
        });

        res.status(200).json({ message: "코멘트 삭제 완료" });

    } else {
        res.status(200).json({ message: "해당하는 정보의 comment 가 없습니다" });
    }

};