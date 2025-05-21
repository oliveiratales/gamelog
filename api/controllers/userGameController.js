const UserGameService = require("../services/userGameService");

class UserGameController {
  //#region Endpoints consumindo IGDB
  static async getAllGamesIgdb(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const result = await UserGameService.getAllGamesIgdb(limit);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getGameByIdIgdb(req, res, next) {
    try {
      const gameId = parseInt(req.params.id);

      const result = await UserGameService.getGameByIdIgdb(gameId);
      if (!result) {
        const error = new Error("Jogo não encontrado na base IGDB");
        error.statusCode = 404;
        throw error;
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  //#endregion

  //#region Endpoints DB
  static async createUserGame(req, res, next) {
    try {
      const { userId, gameId, finishedAt, rating, comment } = req.body;
      const result = await UserGameService.createUserGame(
        userId,
        gameId,
        finishedAt,
        rating,
        comment
      );
      res.status(201).json({ message: "Registro criado com sucesso.", result });
    } catch (error) {
      if (error.message === "Usuário não encontrado") error.statusCode = 400;
      else if (error.message === "Jogo não encontrado na base IGDB")
        error.statusCode = 400;
      next(error);
    }
  }

  static async getAllUserGamesByUserId(req, res, next) {
    try {
      const userId = req.params.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await UserGameService.getAllUserGamesByUserId(userId, page, limit);
      res.json(result);
    } catch (error) {
      if (error.message === "Usuário não encontrado") error.statusCode = 404;
      next(error);
    }
  }

  static async getUserGameById(req, res, next) {
    try {
      const userGameId = req.params.id;

      const result = await UserGameService.getUserGameById(userGameId);
      if (!result) {
        const error = new Error("Registro não encontrado");
        error.statusCode = 404;
        throw error;
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserGameById(req, res, next) {
    try {
      const userGameId = req.params.id;
      const { finishedAt, rating, comment } = req.body;
      const result = await UserGameService.updateUserGameById(
        userGameId,
        finishedAt,
        rating,
        comment
      );

      if (!result) {
        const error = new Error("Registro não encontrado");
        error.statusCode = 404;
        throw error;
      }

      res.json({
        message: "Registro atualizado com sucesso",
        userGame: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserGameById(req, res, next) {
    try {
      const userGameId = req.params.id;
      const result = await UserGameService.deleteUserGameById(userGameId);
      if (!result) {
        const error = new Error("Registro não encontrado");
        error.statusCode = 404;
        throw error;
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  //#endregion
}

module.exports = UserGameController;
