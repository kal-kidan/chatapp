const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { encrypt } = require('../utils/crypto');

const chatSchema = mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      decrypt: true,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.plugin(toJSON);
chatSchema.plugin(mongoosePaginate);

chatSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('message')) {
    user.message = encrypt(user.message);
  }
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
