const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema, updateUserSchema, validateIdParam } = require("../schemas/userSchemas");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/register", validate(registerSchema), UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/login", validate(loginSchema), UserController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários ativos com paginação
 *     tags: [Users]
 *     parameters:
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
 *         description: Número de usuários por página
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/", UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/:id", validateIdParam, UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joaoatualizado@email.com
 *               password:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.put("/:id", validateIdParam, validate(updateUserSchema), UserController.updateUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Inativa (delete lógico) um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser inativado
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.delete("/:id", validateIdParam, UserController.deleteUserById);

module.exports = router;
