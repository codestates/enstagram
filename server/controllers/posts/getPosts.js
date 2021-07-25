const { Posts } = require('../../models');

module.exports = async (req, res) => {

    const postInfo = await Posts.findOne({
        where: { id: req.query.id }
    });

    res.status(200).json(postInfo);
};