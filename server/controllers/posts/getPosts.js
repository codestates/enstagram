const { Users, Posts, Comments } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.user_id }
    });

    const result = [];

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
            .then(value => {
                Promise.all(value.map(el => {
                    const infos = {
                        id: el.id,
                        user_id: el.user_id,
                        content: el.content,
                        pictures: el.pictures,
                        comments: [],
                        likes: [],
                        createdAt: el.createdAt,
                        updatedAt: el.updatedAt
                    };

                    if (el.comment_id.length !== 0) {
                        postEl.comment_id.map(commentEL => {
                            const commentInfos = Comments.findOne({
                                where: { id: commentEL.id }
                            });

                            if (commentInfos) {
                                infos.comments.push(commentInfos.dataValues);
                            } else {
                                res.status(200).json({ message: "일치하는 코멘트 정보가 없습니다" });
                            }
                        })
                    }

                    result.push(infos);
                }))
            });

        res.status(200).json({
            data: result,
            message: "포스트 데이터 불러오기 성공"
        });

    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};