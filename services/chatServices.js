require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const handleChatService = async (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (input) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = input;
        const result = await model.generateContent(prompt);
        resolve({
          data: result.response.text(),
          errCode: 0,
        });
      } else {
        resolve({
          errCode: -1,
          errMsg: "Message empty",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleChatService,
};
