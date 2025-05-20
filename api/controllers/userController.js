const UserService = require("../services/userService");

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser({ name, email, password });
      const userWithoutPassword = { ...user.dataValues };
      delete userWithoutPassword.password;

      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", userWithoutPassword });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
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
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Senha incorreta") {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async inactivateUser(req, res) {
    try {
      await UserService.inactivateUser(req.params.id);
      res.json({ message: "Usuário inativado com sucesso" });
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
