const { Users } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username, email: req.body.email }
    });

    if (!userInfo) {

        console.log("회원가입 성공이요~");

        Users.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.send("회원가입 성공");

    } else {

        console.log("응 중복이에용~");

        res.send(200).json("회원가입 실패");
    }
};