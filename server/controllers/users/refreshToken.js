const { Users } = require('../../models');
const { verify } = require('jsonwebtoken');

module.exports = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(403).json({ message: "리프레쉬 토큰이 존재하지 않습니다" });
    } else {
        try {
            const token = verify(refreshToken, process.env.REFRESH_SECRET);

            console.log("token 의 정보==================>>>>>>>>>>>", token);

            const { id, username, email, createdAt, updatedAt } = token;

            console.log("id 정보 =============>>", id);
            console.log("id 정보 =============>>", username);
            console.log("id 정보 =============>>", email);
            console.log("id 정보 =============>>", createdAt);
            console.log("id 정보 =============>>", updatedAt);

            const payload = {
                id,
                username,
                email,
                createdAt,
                updatedAt,
            }

            const accessToken = sign({
                id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.ACCESS_SECRET, {
                expiresIn: process.env.ACCESS_TIME,
            });

            res.status(200).json({
                accessToken: accessToken,
                userInfo: payload
            });

        } catch {
            res.status(403).json({ message: "리프레쉬 토큰 만료됨" });
        }
    }
};