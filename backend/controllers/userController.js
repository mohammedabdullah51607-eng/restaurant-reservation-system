const getProfile = async (req, res) => {

    res.status(200).json({

        message: "Profile Loaded",

        user: req.user

    });

};

module.exports = {
    getProfile
};