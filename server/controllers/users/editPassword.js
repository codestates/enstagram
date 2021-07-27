const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username }
    });

    if (userInfo) {

        const newPassword = {
            password: req.body.newpw
        };

        Users.update(newPassword, {
            where: { password: req.body.oldpw }
        });

        res.status(200).json({ message: "비밀번호 변경 성공" });
    } else {
        res.status(200).json({ message: "해당하는 유저 정보가 없습니다" });
    }
};