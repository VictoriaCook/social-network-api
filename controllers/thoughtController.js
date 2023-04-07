const { Thought, User } = require("../models");

const thoughtController = {
    // add new thought 
    addThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
            );
        })
        .then((userData) =>
            !userData
            ? res.status(404).json({
                message: "Oops! No user with that ID.",
                })
            : res.json("Thought successfully created!")
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get all thoughts
    allThoughts(req, res) {
    Thought.find()
      .then((allThoughts) => res.json(allThoughts))
      .catch((err) => res.status(500).json(err));
  },
    
    // get thought by ID
    thoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    
    // update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thoughtData) =>
            !thoughtData
            ? res.status(404).json({ message: "Oops! No thought with this ID." })
            : res.json(`Updated thought: ${thoughtData}`)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // delete thought by ID
    deleteThought(req, res) {
        Thought.findByIdAndDelete({ _id: req.params.id })
        .then((thoughtData) =>
            !thoughtData
            ? res.status(404).json({ message: "Oops! No thought with that ID." })
            : res.json({ message: `Thought deleted: ${thoughtData}` })
        )
        .catch((err) => res.status(500).json(err));
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            !thoughtData
            ? res.status(404).json({ message: "Oops! No thought found with that ID." })
            : res.json(`Reaction successfully added to ${thoughtData}`)
        })
        .catch((err) => res.status(500).json(err));
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thoughtData) =>
            !thoughtData
            ? res.status(404).json({ message: "Oops! No thought found with that ID." })
            : res.json(`Successfully deleted reaction to thought: ${thoughtData}`)
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;