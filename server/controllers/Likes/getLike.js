const { Users, Posts, Likes } = require('../../models');

module.exports = async (req, res) => {
    const postInfos = await Posts.findOne({
        where: { id: req.query.post_id }
    });

    if (postInfos) {
        res.status(200).json({
            data: postInfos.like_id,
            message: "좋아요 정보 불러오기 성공"
        })
    } else {
        res.status(200).json({ message: "포스트 ID 정보가 일치하지 않습니다" })
    }
};