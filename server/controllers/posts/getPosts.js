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

                    let infos = {
                        id: el.dataValues.id,
                        user_id: el.dataValues.user_id,
                        content: el.dataValues.content,
                        pictures: el.dataValues.pictures,
                        comments: el.dataValues.comment_id,
                        likes: el.dataValues.like_id,
                        createdAt: el.dataValues.createdAt,
                        updatedAt: el.dataValues.updatedAt
                    };

                    if (el.dataValues.comment_id.length !== 0) {

                        el.dataValues.comment_id.map(commentEL => {
                            const commentInfos = Comments.findOne({
                                where: { id: commentEL.id }
                            });

                            console.log("commentInfossssssssssssssssssssssssssssssss:", commentInfos);

                            // if (commentInfos) {
                            //     infos.comments.push(commentInfos.dataValues);
                            // } else {
                            //     res.status(200).json({ message: "일치하는 코멘트 정보가 없습니다" });
                            // }
                        })
                    }

                    result.push(infos);

                    console.log("resulttttttttttttttttttttttttttttt:", result);
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