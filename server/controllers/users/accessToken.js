const { Users } = require('../../models');
const { verify } = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { headers: { authorization } } = req;

    if (!authorization) {
        res.status(403).json({ message: "액세스 토큰이 존재하지 않습니다" });
    } else {

        let token = authorization.split(' ')[1];
        token = token.slice(0, token.length - 1);

        console.log("토큰의 정보 확인::::::::", token);

        const tokenUserInfo = await verify(
            token, process.env.ACCESS_SECRET);

        console.log("verify의 내부 내용!!!!!!!!!!!!!", tokenUserInfo);

        res.status(200).json(tokenUserInfo);

        // const userInfo = await Users.findOne({
        //     where: { id: id, username: username, email: email }
        // });

        // if (!userInfo) {
        //     res.status(403).json({ message: "유저 정보를 불러오는데 실패했습니다" });
        // } else {

        //     const { dataValues: { id, username, email } } = userInfo;

        //     res.status(200).json({
        //         userInfo: {
        //             id,
        //             username,
        //             email,
        //             createdAt,
        //             updatedAt,
        //         }
        //     });
        // }

        res.status(200).json(tokenUserInfo);
    }
};