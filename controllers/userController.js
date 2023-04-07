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
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
          .then((userData) => {
            if (!userData) {
              res.status(404).json({
                message: "Oops! User does not exist.",
              });
            } else {
              res.status(200).json({
                message: "User updated successfully!",
                user: userData,
              });
            }
          })
          .catch((err) => {
            console.log("Oops! An error has occurred.", err);
            res.status(500).json(err);
          });
      },

    // delete user
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.id })
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "Oops! No user with this ID." })
              : res.json({ message: "User deleted" })
          )
          .catch((err) => res.status(500).json(err));
      },
      
    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "Oops! No user with this ID." })
              : res.json(`New friend added: ${userData}`)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // remove friend
};

module.exports = userController;