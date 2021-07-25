const { Posts } = require('../../models');

module.exports = async (req, res) => {

    const post = {
        user_id: req.body.user_id,
        content: req.body.content,
        pictures: req.body.pictures,
    }

    Posts.create(post);

    res.status(200).json({
        data: post,
        message: "포스트 생성 성공"
    });
};