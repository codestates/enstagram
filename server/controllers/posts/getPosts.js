const { Users, Posts, Comments } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { id: req.query.user_id }
    });

    const result = [];

    if (userInfo) {

        const postInfo = userInfo.dataValues.post_id;

        Promise.all(postInfo.map(async el => {

            const postInfos = Posts.findOne({
                where: { id: el }
            });

            if (postInfos) {
                return postInfos.dataValues;
            } else {
                res.status(200).json({ message: "일치하는 포스트 데이터가 없습니다" });
            }
        }))
            .then(value => {
                console.log("valueeeeeeeeeeeeeeeeeeee", value);
            })

        Promise.all(
            postArr.map(async postEl => {
                const infos = {
                    id: postEl.id,
                    user_id: postEl.user_id,
                    content: postEl.content,
                    pictures: postEl.pictures,
                    comments: [],
                    likes: [],
                    createdAt: postEl.createdAt,
                    updatedAt: postEl.updatedAt
                };

                if (postEl.comment_id.length !== 0) {

                    postEl.comment_id.map(async commentEL => {

                        const commentInfos = await Comments.findOne({
                            where: { id: commentEL.id }
                        });

                        if (commentInfos) {
                            infos.comments.push(commentInfos.dataValues);
                        } else {
                            res.status(200).json({ message: "일치하는 코멘트 정보가 없습니다" });
                        }
                    });
                }

                result.push(infos);
            })
        );

        res.status(200).json({
            data: result,
            message: "포스트 데이터 불러오기 성공"
        });

    } else {
        res.status(200).json({ message: "유저 데이터 불러오기 실패" });
    }
};