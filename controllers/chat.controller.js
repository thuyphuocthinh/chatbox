const { handleChatService } = require("../services/chatServices");

const handleChat = async (req, res) => {
  try {
    if (req.body.prompt) {
      const resp = await handleChatService(req.body.prompt);
      return res.status(200).json(resp);
    } else {
      return res.status(400).json({
        errCode: -1,
        errMsg: "Message empty",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

module.exports = {
  handleChat,
};
