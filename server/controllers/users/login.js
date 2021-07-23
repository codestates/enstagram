const { Users } = require('../../models');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res) => {

    const userName = await Users.findOne({
        where: { username: req.body.username, password: req.body.password }
    });

    const userEmail = await Users.findOne({
        where: { email: req.body.email, password: req.body.password }
    });

    if (userName) {
        const { dataValues: { id, username, email, createdAt, updatedAt } } = userInfo;
        const accessToken = sign({
            id,
            username,
            email,
            createdAt,
            updatedAt,
            iat: Math.floor(Date.now()),
        },
            process.env.ACCESS_SECRET, {
            expiresIn: '30s',
        });

        const refreshToken = sign({
            username,
            email,
            createdAt,
            updatedAt,
            iat: Math.floor(Date.now()),
        },
            process.env.REFRESH_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        res.status(200).json({ accessToken: accessToken, message: "로그인 성공 " });

    } else if (userEmail) {

        const { dataValues: { id, username, email, createdAt, updatedAt } } = userInfo;
        const accessToken = sign({
            id: id,
            username,
            email,
            createdAt,
            updatedAt,
            iat: Math.floor(Date.now()),
        },
            process.env.ACCESS_SECRET, {
            expiresIn: '30s',
        });

        const refreshToken = sign({
            username,
            email,
            createdAt,
            updatedAt,
            iat: Math.floor(Date.now()),
        },
            process.env.REFRESH_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        res.status(200).json({ accessToken: accessToken, message: "로그인 성공 " });

    } else {
        res.status(200).json({ message: "로그인 실패" });
    }
};