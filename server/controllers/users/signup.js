const { Users } = require('../../models');

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

        const newUser = {
            name,
            username,
            email,
            password,
            post_id,
            comment_id,
            like_id,
            follower_id,
            following_id
        };

        newUser.post_id = [];
        newUser.comment_id = [];
        newUser.like_id = [];
        newUser.follower_id = [];
        newUser.following_id = [];

        Users.create(newUser);

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