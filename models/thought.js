const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

// reaction schema (subdocument schema in thought model)

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      // minlength: 1, is this required?
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("DD/MM/YYYY [at] h:mm:ss A"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// thought model schema

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("DD/MM/YYYY [at] h:mm:ss A"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// initialise thought model

const Thought = model("Thought", thoughtSchema);

// virtual to determine number of reactions

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought;

// try day.js or moment.js for createdat date formatting