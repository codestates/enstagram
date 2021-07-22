const { Users } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username, email: req.body.email }
    });

    if (!userInfo) {

        Users.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201).send("회원가입 성공");

    } else {
        res.status(200).send("회원가입 실패");
    }
};