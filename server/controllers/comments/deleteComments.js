const { Users, Posts, Likes, Comments } = require("../../models");

module.exports = async (req, res) => {

    const commentInfo = Comments.findOne({
        where: { id: req.body.comment_id }
    });

    if (commentInfo) {

        await Comments.destroy({
            where: { id: commentInfo }
        });

        res.status(200).json({ message: "코멘트 정상 삭제 완료" });

    } else {
        res.status(200).json({ message: "해당하는 정보의 comment 가 없습니다" });
    }

};