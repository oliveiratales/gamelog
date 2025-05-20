const express = require("express");
const GameController = require("../controllers/gameController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Rotas para gerenciamento de games
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Lista todos os games com paginação
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de games para exibir
 *     responses:
 *       200:
 *         description: Lista de games
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */

router.get("/", GameController.getGamesList);

module.exports = router;
