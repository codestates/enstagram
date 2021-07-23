const { Users } = require('../../models');
const { verify } = require('jsonwebtoken');

module.exports = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(400).json({ message: "리프레쉬 토큰이 존재하지 않습니다" });
    } else {
        const token = verify(refreshToken, process.env.REFRESH_SECRET);

        const { id, username, email, createdAt, updatedAt } = token.body;

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
            expiresIn: '30s',
        });

        res.status(200).json({
            accessToken: accessToken,
            userInfo: payload
        });
    }
};