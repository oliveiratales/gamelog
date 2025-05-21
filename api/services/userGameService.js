const { exist } = require("joi");
const UserGame = require("../models/UserGame");
const UserService = require("./userService");
const IgdbService = require("./igdbService");
const { format, fromUnixTime } = require("date-fns");

class UserGameService {
  //#region Endpoints DB
  static async createUserGame(userId, gameId, finishedAt, rating, comment) {
    const existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }
    const existingGame = await this.getGameByIdIgdb(gameId);
    if (!existingGame) {
      throw new Error("Jogo não encontrado na base IGDB");
    }

    const data = { userId, gameId, finishedAt, rating, comment };

    const userGame = await UserGame.create(data);
    return userGame;
  }

  static async getAllUserGamesByUserId(userId, page = 1, limit = 10) {
    const existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      throw error;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await UserGame.findAndCountAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      games: rows,
    };
  }

  static async getUserGameById(id) {
    const userGame = await UserGame.findByPk(id);
    if (!userGame) return null;
    return userGame;
  }

  static async updateUserGameById(id, finishedAt, rating, comment) {
    const userGame = await UserGame.findByPk(id);
    if (!userGame) return null;

    const updatedData = { finishedAt, rating, comment };
    await userGame.update(updatedData);
    return userGame;
  }

  static async deleteUserGameById(id) {
    const userGame = await UserGame.findByPk(id);
    if (!userGame) return null;

    await userGame.destroy();
    return { message: "Registro excluído com sucesso.", userGame };
  }

  //#endregion

  //#region Endpoints consumindo IGDB
  static async getAllGamesIgdb(limit) {
    const query = `
      fields id, name, cover.url, platforms.name, summary, total_rating;
      sort total_rating_count desc;
      limit ${limit};
    `;
    const games = await IgdbService.getGames(query);
    return { games };
  }

  static async getGameByIdIgdb(id) {
    const query = `
    fields id, name, cover.url, first_release_date, genres.name, platforms.name, total_rating, storyline, summary, videos.video_id;
    where id = ${id};
  `;
    const games = await IgdbService.getGames(query);
    const game = games[0];

    if (!game) {
      return null;
    }

    let coverUrl = null;
    if (game.cover) {
      coverUrl = game.cover.url.replace("t_thumb", "t_cover_big");
    }

    let releaseDateFormatted;
    if (game.first_release_date) {
      const releaseDate = fromUnixTime(game.first_release_date);
      releaseDate.setHours(releaseDate.getHours() + 3);
      releaseDateFormatted = format(releaseDate, "dd/MM/yyyy");
    }

    const youtubeBaseUrl = "https://www.youtube.com/watch?v=";
    const videoUrls = game.videos
      ? game.videos.map((v) => youtubeBaseUrl + v.video_id)
      : [];

    return {
      id: game.id,
      name: game.name,
      cover: coverUrl,
      releaseDate: releaseDateFormatted,
      genres: game.genres,
      platforms: game.platforms,
      totalRating: game.total_rating,
      storyline: game.storyline,
      summary: game.summary,
      videos: videoUrls,
    };
  }
  //#endregion
}

module.exports = UserGameService;
