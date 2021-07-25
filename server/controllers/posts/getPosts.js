const { Posts } = require('../../models');

module.exports = async (req, res) => {

    if (req.body.id.length !== 0) {
        const arr = req.query.id.map(el => {
            return await Posts.findOne({
                where: { id: el }
            });
        });

        res.status(200).json({
            data: arr,
            message: "포스트 데이터 불러오기 성공"
        });

    } else {
        const postInfo = await Posts.findOne({
            where: { id: req.query.id }
        });

        res.status(200).json({
            data: postInfo,
            message: "포스트 데이터 불러오기 성공"
        });
    }

    res.status(200).json({ message: "포스터 데이터 불러오기 실패" });
};