const express = require("express");
const UserGameController = require("../controllers/userGameController");
const router = express.Router();
const validate = require("../middlewares/validateMiddleware");
const {
  createUserGameSchema,
  updateUserGameSchema,
  validateGameIdParam,
} = require("../schemas/userGameSchemas");
const { validateIdParam } = require("../schemas/userSchemas");

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Rotas para gerenciamento de registros de games
 */

/**
 * @swagger
 * /api/games/igdb:
 *   get:
 *     summary: Lista os games mais bem avaliados da IGDB, com limite na paginação
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

router.get("/igdb", UserGameController.getAllGamesIgdb);

/**
 * @swagger
 * /api/games/igdb/{id}:
 *   get:
 *     summary: Busca um game por ID na base IGBD
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           example: 1025
 *         description: ID do game
 *     responses:
 *       200:
 *         description: Informações do game
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get(
  "/igdb/:id",
  validateGameIdParam,
  UserGameController.getGameByIdIgdb
);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Registra um game finalizado pelo usuário
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gameId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 3a7c0672-5bea-403d-89e3-9f2da43fca8f
 *               gameId:
 *                 type: integer
 *                 example: 1025
 *               finishedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-05-20T18:00:00.000Z
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.3
 *               comment:
 *                 type: string
 *                 example: "Jogo incrível com ótimas mecânicas!"
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário/jogo não encontrado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.post(
  "/",
  validate(createUserGameSchema),
  UserGameController.createUserGame
);

/**
 * @swagger
 * /api/games/user/{id}:
 *   get:
 *     summary: Lista todos os games registrados por um usuário com paginação
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 3a7c0672-5bea-403d-89e3-9f2da43fca8f
 *         description: ID do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de itens por página
 *     responses:
 *       200:
 *         description: Lista de games do usuário
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get(
  "/user/:id",
  validateIdParam,
  UserGameController.getAllUserGamesByUserId
);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Busca um registro de game finalizado por ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 3a7c0672-5bea-403d-89e3-9f2da43fca8f
 *         description: ID do registro de game
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro não encontrado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/:id", validateIdParam, UserGameController.getUserGameById);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Atualiza um registro de game finalizado
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 3a7c0672-5bea-403d-89e3-9f2da43fca8f
 *         description: ID do registro de game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               finishedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-05-20T18:00:00.000Z
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Atualizado: jogo ainda é excelente!"
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       400:
 *         description: ID ou dados inválidos
 *       404:
 *         description: Registro não encontrado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.put(
  "/:id",
  validateIdParam,
  validate(updateUserGameSchema),
  UserGameController.updateUserGameById
);

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Exclui um registro de game finalizado
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 3a7c0672-5bea-403d-89e3-9f2da43fca8f
 *         description: ID do registro de game
 *     responses:
 *       200:
 *         description: Registro excluído com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro não encontrado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.delete("/:id", validateIdParam, UserGameController.deleteUserGameById);

module.exports = router;
