const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET || "secretkey123";

class UserService {
  static async createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email, active: true } });
  }

  static async getUserById(id) {
    return await User.findOne({ where: { id, active: true } });
  }

  static async authenticate(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1d",
    });
    return { user, token };
  }

  static async updateUser(id, data) {
    const user = await this.getUserById(id);
    if (!user) throw new Error('Usuário não encontrado');

    await user.update(data);
    return user;
  }

  static async inactivateUser(id) {
    const user = await this.getUserById(id);
    if (!user) throw new Error('Usuário não encontrado');

    await user.update({ active: false });
    return user;
  }
}

module.exports = UserService;
