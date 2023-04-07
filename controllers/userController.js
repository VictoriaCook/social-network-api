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

    // get all users
    allUsers(req, res) {
        User.find()
        //   .populate("thoughts")
          .populate("friends")
          .select("-__v")
          .then((userData) => res.json(userData))
          .catch((err) => {
            console.log("Oops! An error has occurred.", err);
            res.status(500).json(err);
          });
      },

    // get user by ID
    userById(req, res) {
        User.findOne({ _id: req.params.id })
          .then((userData) => res.json(userData))
          .catch((err) => {
            console.log("Oops! An error has occurred.", err);
            res.status(500).json(err);
          });
      },

    // update user

    // delete user

    // add friend

    // remove friend
};

module.exports = userController;