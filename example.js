require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const askAnswer = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Cho tôi lịch trình du lịch tại Đà Nẵng 2 ngày 1 đêm";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
};

askAnswer();
