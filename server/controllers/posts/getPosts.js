const { Posts } = require('../../models');

module.exports = async (req, res) => {

    if (req.headers.post_id.length !== 0) {

        let post_id = req.headers.post_id;

        console.log("post_id 의 정보는요~~~~~~~~~", typeof post_id);

        const arr = req.headers.post_id.map(async el => {
            return await Posts.findOne({
                where: { id: el }
            });
        });

        const result = arr.map(el => {
            return el.dataValues;
        });

        res.status(200).json({
            data: result,
            message: "포스트 데이터 불러오기 성공"
        });

    } else {
        const postInfo = await Posts.findOne({
            where: { id: req.headers.post_id }
        });

        res.status(200).json({
            data: postInfo,
            message: "포스트 데이터 불러오기 성공"
        });
    }

    res.status(200).json({ message: "포스터 데이터 불러오기 실패" });
};