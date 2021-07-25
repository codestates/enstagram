const { values } = require('sequelize/types/lib/operators');
const { Users, Posts } = require('../../models');

module.exports = async (req, res) => {

    const post = {
        user_id: req.body.user_id,
        content: req.body.content,
        pictures: req.body.pictures,
    }

    await Posts.create(post)
        .then(value => {

            const userInfo = await Users.findOne({
                where: { id: user_id }
            });

            console.log("userInfo:", userInfo);

            if (userInfo) {

                const postArr = userInfo.dataValues.post_id;

                console.log("value.dataValues", value.dataValues);

                if (postArr.length > 0) {
                    Users.create({
                        post_id: [...postArr, value.dataValues.id]
                    });
                } else {
                    Users.create({
                        post_id: [value.dataValues.id]
                    });
                }

                res.status(200).json({
                    data: post,
                    message: "포스트 생성 성공"
                });

            } else {
                res.status(200).json({ message: "포스트 생성 도중 일치하는 유저 정보를 찾지못했습니다" });
            }
        });
};