const SystemLog = require("../models/SystemLog");

class LogService {
  static async error({ message, stack, route, method, userId }) {
    try {
      await SystemLog.create({
        level: "error",
        message,
        stack,
        route,
        method,
      });
    } catch (err) {
      console.error("Erro ao registrar log:", err);
    }
  }
}

module.exports = LogService;
