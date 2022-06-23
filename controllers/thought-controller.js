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
        .then((dbThoughtData) => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
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

    //add Reactions PUT
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { thoughts: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
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

    //DELETE thought and remove it from the thought that it's associated with
    deleteThought({ params }, res) {
        //deletes the doc while returning its data
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((deletedThought) => {
            if (!deletedThought) {
              return res.status(404).json({ message: "No thought found with this id!" });
            }
            return Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                //$pull= take the data to identify and move it from associated user
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    //remove Reaction
    removeReaction({ params },res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
    }

}

module.exports = thoughtController;