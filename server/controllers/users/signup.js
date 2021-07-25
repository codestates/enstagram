const { Users, Test } = require('../../models');

//! 회원가입 관련 컨트롤러

module.exports = async (req, res) => {

    const userName = await Users.findOne({
        where: { username: req.body.username },
        attributes: ['username']
    });

    const userEmail = await Users.findOne({
        where: { email: req.body.email },
        attributes: ['email']
    });

    if (userName) {
        res.status(200).json({ message: "이미 존재하는 username 입니다" });
    } else if (userEmail) {
        res.status(200).json({ message: "이미 존재하는 email 입니다" });
    } else {
        const { name, username, email, password } = req.body;

        Users.create({
            name,
            username,
            email,
            password,
        });

        const arr = [1, 2, 3];

        Test.create({
            array: arr
        });

        res.status(201).send({
            data: {
                name,
                username,
                email,
            },
            message: "회원가입 성공"
        });
    }
};