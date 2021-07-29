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

        await Users.create({
            name,
            username,
            email,
            profilePhoto: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
            password,
            post_id: [],
            comment_id: [],
            like_id: [],
            follower_id: [],
            following_id: []
        });

        const userInfo = await Users.findOne({
            where: { username: req.body.username }
        });

        res.status(201).send({
            data: {
                id: userInfo.dataValues.id,
                name,
                username,
                email,
            },
            message: "회원가입 성공"
        });
    }
};