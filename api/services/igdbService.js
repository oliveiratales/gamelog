const axios = require("axios");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tokenUrl = "https://id.twitch.tv/oauth2/token";

let cachedToken = null;
let tokenExpiresAt = 0;

class IgdbService {
  static async getValidToken() {
    const now = Date.now();

    if (cachedToken && now < tokenExpiresAt) {
      return cachedToken;
    }

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        },
      });

      cachedToken = response.data.access_token;
      tokenExpiresAt = now + response.data.expires_in * 1000 - 60 * 1000;

      return cachedToken;
    } catch (error) {
      console.error(
        "Erro ao obter token IGDB:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  static async getGames(query) {
    const token = await this.getValidToken();

    try {
      const response = await axios.post(
        "https://api.igdb.com/v4/games",
        query,
        {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar jogos:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

module.exports = IgdbService;
