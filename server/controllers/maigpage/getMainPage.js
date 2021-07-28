const { Users, Posts } = require('../../models');
const { verify, sign } = require('jsonwebtoken');

module.exports = async (req, res) => {

    //push 용 데이터 추가

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

            console.log("otherUserssssssssssssssssssssss", otherUsers);

            Promise.all(otherUsers.map(async el => {
                const postInfos = await Posts.findOne({
                    where: { user_id: el.dataValues.id }
                });

                console.log("postInfossssssssssssssssss", postInfos);

                if (postInfos) {
                    return postInfos.dataValues;
                } else {
                    res.status(200).json({ message: "일치하는 포스트 정보가 없습니다" });
                }
            }))
                .then(result => {
                    res.status(200).json({
                        data: result,
                        message: "포스트 데이터 요청 성공"
                    });
                });
        } catch {
            res.status(200).json({ message: "만료된 토큰" });
        }
    }
};