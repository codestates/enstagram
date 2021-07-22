const { User } = require('../../models');

module.exports = async (req, res) => {

    User.create({
        name: 'JiHo',
        accountName: 'JiHo9_96',
        profilePhoto: "이미지 경로",
        email: "wjswlgh96@naver.com",
        password: "dndldka19"
    })

    res.send("회원 가입 성공");
};