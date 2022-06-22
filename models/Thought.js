const { Schema, model, Types } = require("mongoose");

//need dateformat?

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
},
{
    toJSON: {
        getters: true
    }
}
);

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
  reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

//count the lengths of thought's reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;