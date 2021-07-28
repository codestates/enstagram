const { Users, Posts } = require('../../models');
const { verify, sign } = require('jsonwebtoken');

module.exports = async (req, res) => {

    const { headers: { authorization } } = req;

    if (!authorization) {
        res.status(200).json({ message: "액세스 토큰이 존재하지 않습니다" });
    } else {
        try {
            let token = authorization.split(' ')[1];
            token = token.slice(0, token.length - 1);

            const tokenUserInfo = await verify(
                token, process.env.ACCESS_SECRET
            );

            const userArr = await Users.findAll();

            const otherUsers = userArr.filter(el => {
                return el.dataValues.id !== tokenUserInfo.id;
            });

            const getPostInfos = otherUsers.filter(el => {
                return el.dataValues.post_id.length > 0;
            });

            let postNum = [];
            let result = [];

            getPostInfos.map(el => {
                el.dataValues.post_id.map(ell => {
                    postNum.push(ell);
                })
            });

            for (let i = 0; i < postNum.length; i++) {
                const postInfos = await Posts.findOne({
                    where: { id: postNum[i] }
                });

                if (postInfos) {
                    result.push(postInfos);
                }
            }

            res.status(200).json({
                data: result,
                message: "테스트"
            });

        } catch {
            res.status(200).json({ message: "만료된 토큰" });
        }
    }
};