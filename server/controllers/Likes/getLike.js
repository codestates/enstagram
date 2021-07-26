const { Posts, Likes } = require('../../models');

module.exports = async (req, res) => {
    const postInfos = await Posts.findOne({
        where: { id: req.query.post_id }
    });

    if (postInfos) {

        Promise.all(postInfos.like_id.map(async el => {

            console.log("elllllllllllllllllllllllll", el);

            // const likeInfos = await Likes.findOne({
            //     where: { id: el.dataValues.like_id }
            // });

            // if (likeInfos) {
            //     return likeInfos.dataValues;
            // } else {
            //     res.status(200).json({ message: "좋아요 ID 정보가 일치하지 않습니다" })
            // }
        }))
        // .then(result => {
        //     res.status(200).json({
        //         data: result,
        //         message: "좋아요 데이터 불러오기 성공"
        //     })
        // })

    } else {
        res.status(200).json({ message: "포스트 ID 정보가 일치하지 않습니다" })
    }
};