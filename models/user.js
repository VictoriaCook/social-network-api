const { Schema, model } = require("mongoose");
const validate = require("mongoose-validator");

// user model schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "An email address is required."],
      unique: true,
      validate: {
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: (email) =>
          `Oops! ${email.value} is not a valid email address.`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// initialise user model

const User = model("User", userSchema);

// virtual to determine number of friends

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;
