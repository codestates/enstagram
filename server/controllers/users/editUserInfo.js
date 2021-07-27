const { Users } = require('../../models');

module.exports = async (req, res) => {

    if (req.body.newusername && req.body.newemail && req.body.newname) {

        const userName = await Users.findOne({
            where: { username: req.body.newusername }
        });

        const userEmail = await Users.findOne({
            where: { email: req.body.newemail }
        });

        if (!userName && !userEmail) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                name: req.body.newname,
                username: req.body.newusername,
                email: req.body.newemail
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

    } else if (req.body.newname && req.body.newusername && !req.body.newemail) {

        const userName = await Users.findOne({
            where: { username: req.body.newusername }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                name: req.body.newname,
                username: req.body.newusername,
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
    } else if (req.body.newname && !req.body.newusername && req.body.newemail) {
        const userEmail = await Users.findOne({
            where: { email: req.body.newemail }
        });

        if (!userEmail) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                name: req.body.newname,
                email: req.body.newemail,
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
    } else if (!req.body.newname && req.body.newusername && req.body.newemail) {
        const userName = await Users.findOne({
            where: { username: req.body.newusername }
        });

        const userEmail = await Users.findOne({
            where: { email: req.body.newemail }
        });

        if (!userName && !userEmail) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                username: req.body.newusername,
                email: req.body.newemail
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
    } else if (req.body.newname && !req.body.newusername && !req.body.newemail) {
        const userName = await Users.findOne({
            where: { name: req.body.newname }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                name: req.body.newname
            }

            Users.update(result, {
                where: { id: userInfo.dataValues.id }
            });

            res.status(200).json({
                data: result,
                message: "유저 데이터 변경 성공"
            });

        }
    } else if (!req.body.newname && req.body.newusername && !req.body.newemail) {
        const userName = await Users.findOne({
            where: { username: req.body.newusername }
        });

        if (!userName) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                username: req.body.newusername
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
    } else if (!req.body.newname && !req.body.newusername && req.body.newemail) {
        const userEmail = await Users.findOne({
            where: { email: req.body.newemail }
        });

        if (!userEmail) {

            const userInfo = await Users.findOne({
                where: { username: req.body.username }
            });

            const result = {
                email: req.body.newemail
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