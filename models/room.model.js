const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const roomSchema = mongoose.Schema(
  {
    userId1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.plugin(toJSON);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
