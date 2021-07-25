const { Posts } = require('../../models');

module.exports = async (req, res) => {

    if (req.query.post_id.length !== 0) {

        const arr = req.query.post_id.map(async el => {
            return await Posts.findOne({
                where: { id: el }
            });
        });

        console.log("arr의 정보보옹몽몽몽노옴ㄴ온ㅁ옴", arr);

        const result = arr.map(el => {
            return el.dataValues;
        });

        res.status(200).json({
            data: result,
            message: "포스트 데이터 불러오기 성공"
        });

    } else {
        const postInfo = await Posts.findOne({
            where: { id: req.query.post_id }
        });

        res.status(200).json({
            data: postInfo,
            message: "포스트 데이터 불러오기 성공"
        });
    }

    res.status(200).json({ message: "포스터 데이터 불러오기 실패" });
};