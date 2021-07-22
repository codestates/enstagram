const { Users } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    console.log("User 의 정보:", Users);

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

        res.send({
            data: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            },
            message: "회원가입 성공"
        });
    } else {
        res.send(200).json({ message: "회원가입 실패" });
    }
};