const { Schema, model, Types } = require("mongoose");

//need dateformat?

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true, //requiring data to exist for this field
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }
  ]
},
{
    toJSON: {
        getters: true
    }
}
);

//count the lengths of thought's reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;