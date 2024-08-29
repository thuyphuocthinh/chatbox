const chatRoutes = require("./chat.route");

module.exports = (app) => {
  app.use("/api/v1/chat", chatRoutes);
};
