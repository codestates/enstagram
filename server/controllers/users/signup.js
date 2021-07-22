const { Users } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username, email: req.body.email }
    });

    if (!userInfo) {

        const { name, username, email, password } = req.body;

        Users.create({
            name,
            username,
            email,
            password,
        });

        res.status(201).send({
            data: {
                name,
                username,
                email,
            },
            message: "회원가입 성공"
        });
    } else {
        res.status(200).json({ message: "회원정보 중복으로 인한 가입 실패" });
    }
};