const { User } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    const userInfo = User.findOne({
        where: { username: req.body.username, email: req.body.email }
    });

    if (userInfo) {
        res.send(200).json({ message: "회원가입 실패" });
    } else {
        User.create({
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
    }
};