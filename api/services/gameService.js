const IgdbService = require("./igdbService");

class GameService {
  static async getGamesList(limit) {
    const query = `
      fields name, cover.url, platforms.name, summary, total_rating;
      sort total_rating_count desc;
      limit ${limit};
    `;

    const games = await IgdbService.getGames(query);
    return { games };
  }
}

module.exports = GameService;
