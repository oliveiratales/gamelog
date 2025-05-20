const IgdbService = require("./services/igdbService");

class GameService {
  static async buscarJogos() {
    // Incluir paginação
    const query = `fields name,genres.name,release_dates.date; limit 10; sort popularity desc;`;
    const jogos = await IgdbService.getGames(query);
    console.log(jogos);
  }
}

module.exports = GameService;
