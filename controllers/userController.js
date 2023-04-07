const { Thought, User } = require("../models");

const userController = {
    // add a new user 
    addUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log("Oops! An error has occurred.", err);
                res.status(500).json(err);
        });
    },
};

module.exports = userController;