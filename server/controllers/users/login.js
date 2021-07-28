require("dotenv").config();
const { Users } = require('../../models');
const { sign } = require('jsonwebtoken');

module.exports = async (req, res) => {

    if (req.body.username) {

        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        if (userName) {

            const userPassword = await Users.findOne({
                where: { password: req.body.password }
            });

            if (!userPassword) {
                res.status(200).json({ message: "비밀번호 오류" });
            } else {

                delete userName.dataValues.password;
                const accessToken = await sign(
                    userName.dataValues,
                    process.env.ACCESS_SECRET, {
                    expiresIn: process.env.ACCESS_TIME,
                });

                const refreshToken = await sign(
                    userName.dataValues,
                    process.env.REFRESH_SECRET, {
                    expiresIn: '7d'
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                });

                res.status(200).json({
                    accessToken: accessToken,
                    userData: userName,
                    message: "로그인 성공 "
                });
            }

        } else {
            res.status(200).json({ message: "아이디 오류" });
        }
    } else if (req.body.email) {
        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!userEmail) {
            res.status(200).json({ message: "이메일 오류" });
        } else {
            const userPassword = await Users.findOne({
                where: { password: req.body.password }
            });

            if (!userPassword) {
                res.status(200).json({ message: "비밀번호 오류" });
            } else {

                delete userEmail.dataValues.password;
                const accessToken = await sign(
                    userEmail.dataValues,
                    process.env.ACCESS_SECRET, {
                    expiresIn: process.env.ACCESS_TIME,
                });

                const refreshToken = await sign(
                    userEmail.dataValues,
                    process.env.REFRESH_SECRET, {
                    expiresIn: '7d'
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                });

                res.status(200).json({
                    accessToken: accessToken,
                    userData: userEmail.dataValues,
                    message: "로그인 성공"
                });
            }
        }
    }
};