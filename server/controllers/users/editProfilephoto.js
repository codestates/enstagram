const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username }
    });

    if (userInfo) {

        const newPhoto = {
            profilePhoto: req.body.picture
        };

        Users.update(newPhoto, {
            where: { id: userInfo.dataValues.id }
        });

        res.status(200).json({
            data: newPhoto,
            message: "프로필 사진 변경 성공"
        });

    } else {
        res.status(200).json({ message: "일치하는 유저 정보가 없습니다" });
    }
};