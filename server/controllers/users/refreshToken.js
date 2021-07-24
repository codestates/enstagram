const { verify, sign } = require('jsonwebtoken');

module.exports = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    console.log("refreshToken where??", req.cookies);

    if (!refreshToken) {
        res.status(200).json({ message: "리프레쉬 토큰이 존재하지 않습니다" });
    } else {
        try {
            const token = await verify(refreshToken, process.env.REFRESH_SECRET);

            const { id, username, email, createdAt, updatedAt } = token;

            const payload = {
                id,
                username,
                email,
                createdAt,
                updatedAt,
            }

            const accessToken = await sign({
                id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.ACCESS_SECRET, {
                expiresIn: process.env.ACCESS_TIME,
            });

            console.log("accessToken======>>>", accessToken);

            res.status(200).json({
                accessToken: accessToken,
                userInfo: payload,
            });
        } catch {
            res.status(200).json({ message: "리프레쉬 토큰 만료" });
        }
    }
};