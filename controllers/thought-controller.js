const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.json(400).json(err);
        });
    },

    //GET thought by id
    getThoughtById({ params }, res) {
        Thought.findOne ({ _id: params.id })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.json(400).json(err);
        });
    },

    // POST create new thought
    createThought({ body }, res) {
        Thought.create(body) 
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                //$push method to add thought's _id to specific user
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(400).json(err));
    },

    //PUT to update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body)
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
    },

    //DELETE 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
    }

}

module.exports = thoughtController;