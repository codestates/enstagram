const { Users } = require('../../models');

module.exports = async (req, res) => {

    if (req.body.username && req.body.email && req.body.name) {

        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!userName && !userEmail) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else if (userName) {
            res.status(200).json({
                message: "이미 존재하는 username 입니다"
            });
        } else if (userEmail) {
            res.status(200).json({
                message: "이미 존재하는 email 입니다"
            });
        }

    } else if (req.body.name && req.body.username && !req.body.email) {

        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                name: req.body.name,
                username: req.body.username,
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else if (userName) {
            res.status(200).json({
                message: "이미 존재하는 username 입니다"
            });
        }
    } else if (req.body.name && !req.body.username && req.body.email) {
        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!userEmail) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                name: req.body.name,
                email: req.body.email,
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else if (userEmail) {
            res.status(200).json({
                message: "이미 존재하는 email 입니다"
            });
        }
    } else if (!req.body.name && req.body.username && req.body.email) {
        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!userName && !userEmail) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                username: req.body.username,
                email: req.body.email
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else if (userName) {
            res.status(200).json({
                message: "이미 존재하는 username 입니다"
            });
        } else if (userEmail) {
            res.status(200).json({
                message: "이미 존재하는 email 입니다"
            });
        }
    } else if (req.body.name && !req.body.username && !req.body.email) {
        const userName = await Users.findOne({
            where: { name: req.body.name }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                name: req.body.name
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        }
    } else if (!req.body.name && req.body.username && !req.body.email) {
        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                username: req.body.username
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else {
            res.status(200).json({
                message: "이미 존재하는 username 입니다"
            });
        }
    } else if (!req.body.name && !req.body.username && req.body.email) {
        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!userEmail) {

            const userInfo = await Users.findOne({
                where: { id: req.body.user_id }
            });

            const result = {
                email: req.body.email
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        } else {
            res.status(200).json({
                message: "이미 존재하는 email 입니다"
            });
        }
    }
};