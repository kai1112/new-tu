const mongoose = require("./dbConnection");

const ConversationSchema = mongoose.Schema(
  {
    idUser: String,
    nameConversation: String,
    lastMessage: String,
    seen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("conversation", ConversationSchema);
