const { Users, Posts, Comments } = require("../../models");

module.exports = async (req, res) => {

    if (req.query.post_id) {
        const postInfo = await Posts.findOne({
            where: { id: req.query.post_id }
        });

        if (postInfo) {

            const commentInfo = postInfo.dataValues.comment_id;

            Promise.all(commentInfo.map(el => {

                const commentInfos = Comments.findOne({
                    where: { id: el }
                });

                if (commentInfos) {
                    return {
                        commentInfos,
                        username: postInfo.dataValues.username
                    };
                } else {
                    res.status(200).json({ message: "일치하는 포스트 데이터가 없습니다" });
                }
            }))
                .then(result => {
                    res.status(200).json({
                        data: result,
                        message: "코멘트 데이터 불러오기 성공"
                    })
                });
        } else {
            res.status(200).json({ message: "존재하지 않는 포스트 아이디 입니다" });
        }

    } else if (req.query.user_id) {
        const userInfo = await Users.findOne({
            where: { id: req.query.user_id }
        });

        if (userInfo) {

            const commentInfo = userInfo.dataValues.comment_id;

            Promise.all(commentInfo.map(el => {

                const commentInfos = Comments.findOne({
                    where: { id: el }
                });

                if (commentInfos) {
                    return {
                        commentInfos,
                        username: userInfo.dataValues.username
                    };
                } else {
                    res.status(200).json({ message: "일치하는 포스트 데이터가 없습니다" });
                }
            }))
                .then(result => {
                    res.status(200).json({
                        data: result,
                        message: "코멘트 데이터 불러오기 성공"
                    })
                });
        } else {
            res.status(200).json({ message: "존재하지 않는 포스트 아이디 입니다" });
        }
    }
};