const { Thought} = require('../models')

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    createThought({ params,body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params.userId },
              // push method to add comment's id to the specific pizza we want to update
              // adds data to an array 
              // all MongoDB-based functions like push start with $
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },
    
    updateThought({ params, body }, res) {
        // runValidtors will validate any new information when updating data 
        // ..when it s not true, only validate when a user first create a thought
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    
    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
    }
}

module.exports = thoughtController;