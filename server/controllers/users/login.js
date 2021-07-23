const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { username: req.body.username, email: req.body.email, password: req.body.password }
    });

    if (userInfo) {



    } else {
        res.status(200).json({ message: "로그인 실패" });
    }
};