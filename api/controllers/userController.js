const UserService = require("../services/userService");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser({ name, email, password });
      const userWithoutPassword = { ...user.dataValues };
      delete userWithoutPassword.password;

      res
        .status(201)
        .json({ message: "Usuário criado com sucesso.", userWithoutPassword });
    } catch (error) {
      error.statusCode = error.statusCode;
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.authenticate(email, password);
      const userWithoutPassword = { ...user.dataValues };
      delete userWithoutPassword.password;

      res.json({
        message: "Login realizado com sucesso",
        userWithoutPassword,
        token,
      });
    } catch (error) {
      if (error.message === "Usuário não encontrado") error.statusCode = 404;
      else if (error.message === "Senha incorreta") error.statusCode = 401;
      else error.statusCode = 500;
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await UserService.getAllUsers(page, limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      const userWithoutPassword = { ...user.dataValues };
      delete userWithoutPassword.password;

      if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.json(userWithoutPassword);
    } catch (error) {
      error.statusCode = error.statusCode;
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      error.statusCode = error.statusCode;
      next(error);
    }
  }

  static async inactivateUser(req, res, next) {
    try {
      const result = await UserService.inactivateUser(req.params.id);
      if (!result) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.json({ message: "Usuário inativado com sucesso" });
    } catch (error) {
      error.statusCode = error.statusCode;
      next(error);
    }
  }
}

module.exports = UserController;
