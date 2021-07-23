const { Users } = require('../../models');
const { verify } = require('njwt');

module.exports = async (req, res) => {
    const { headers: { authorization } } = req;

    if (!authorization) {
        res.status(403).json({ message: "액세스 토큰이 존재하지 않습니다" });
    } else {

        const token = authorization.split(' ')[1];
        const { body: { id, username, email, createdAt, updatedAt } } = nJwt.verify(
            token, process.env.ACCESS_SECRET);

        const userInfo = await Users.findOne({
            where: { id: id, username: username, email: email }
        });

        if (!userInfo) {
            res.status(403).json({ message: "유저 정보를 불러오는데 실패했습니다" });
        } else {

            const { dataValues: { id, username, email } } = userInfo;

            res.status(200).json({
                userInfo: {
                    id,
                    username,
                    email,
                    createdAt,
                    updatedAt,
                }
            });
        }
    }
};