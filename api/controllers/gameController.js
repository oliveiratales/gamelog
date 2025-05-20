const GameService = require("../services/gameService");

class GameController {
  static async getGamesList(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;

      const result = await GameService.getGamesList(limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
