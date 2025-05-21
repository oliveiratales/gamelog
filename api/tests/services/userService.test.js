jest.mock("../../models/User", () => {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    findAndCountAll: jest.fn(),
  };
});

const UserService = require("../../services/userService");
const User = require("../../models/User");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  //#region Erros de registro e autenticação

  test("createUser deve criar usuário com senha hasheada", async () => {
    User.create.mockResolvedValue({
      id: "uuid-teste",
      name: "Teste",
      email: "teste@email.com",
      password: "hash-da-senha",
    });

    const user = await UserService.createUser({
      name: "Teste",
      email: "teste@email.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Teste",
        email: "teste@email.com",
        password: expect.any(String),
      })
    );
  });

  test("authenticate deve retornar user e token se a senha estiver correta", async () => {
    const mockUser = {
      id: "uuid-teste",
      email: "teste@email.com",
      password: "$2a$10$hashfake",
      update: jest.fn().mockResolvedValue(),
      dataValues: {
        id: "uuid-teste",
        email: "teste@email.com",
        password: "$2a$10$hashfake",
      },
    };

    jest.spyOn(UserService, "getUserByEmail").mockResolvedValue(mockUser);

    const bcrypt = require("bcryptjs");
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const jwt = require("jsonwebtoken");
    jest.spyOn(jwt, "sign").mockReturnValue("token-fake");

    const result = await UserService.authenticate("teste@email.com", "123456");

    expect(result).toHaveProperty("token", "token-fake");
    expect(result).toHaveProperty("user", mockUser);
    expect(mockUser.update).toHaveBeenCalledWith(expect.objectContaining({}));
  });

  test("authenticate deve lançar erro se senha estiver incorreta", async () => {
    const mockUser = {
      id: "uuid-teste",
      email: "teste@email.com",
      password: "$2a$10$hashfake",
    };

    jest.spyOn(UserService, "getUserByEmail").mockResolvedValue(mockUser);

    const bcrypt = require("bcryptjs");
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(
      UserService.authenticate("teste@email.com", "senhaerrada")
    ).rejects.toThrow("Senha incorreta");
  });

  test("authenticate deve retornar null se usuário não existir", async () => {
    jest.spyOn(UserService, "getUserByEmail").mockResolvedValue(null);

    const result = await UserService.authenticate(
      "email@naoexiste.com",
      "qualquer"
    );
    expect(result).toBeNull();
  });
  //#endregion

  //#region Erros de usuário

  test("getAllUsers deve retornar dados paginados e excluir senha", async () => {
    const mockUsers = [
      {
        id: "1",
        name: "User 1",
        email: "user1@test.com",
        password: "hash",
        active: true,
      },
      {
        id: "2",
        name: "User 2",
        email: "user2@test.com",
        password: "hash",
        active: true,
      },
    ];

    User.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: mockUsers,
    });

    const result = await UserService.getAllUsers(1, 2);

    expect(User.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { active: true },
        attributes: { exclude: ["password"] },
        limit: 2,
        offset: 0,
      })
    );

    expect(result).toMatchObject({
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
      users: mockUsers,
    });
  });

  test("getUserByEmail deve buscar usuário ativo pelo email", async () => {
    const mockUser = { id: "1", email: "test@test.com", active: true };
    User.findOne.mockResolvedValue(mockUser);

    const user = await UserService.getUserByEmail("test@test.com");
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "test@test.com", active: true },
    });
    expect(user).toBe(mockUser);
  });

  test("getUserById deve buscar usuário ativo pelo id", async () => {
    const mockUser = { id: "1", email: "test@test.com", active: true };
    User.findOne.mockResolvedValue(mockUser);

    const user = await UserService.getUserById("1");
    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: "1", active: true },
    });
    expect(user).toBe(mockUser);
  });

  test("updateUserById deve atualizar e retornar usuário", async () => {
    const mockUser = { update: jest.fn().mockResolvedValue(), id: "1" };
    jest.spyOn(UserService, "getUserById").mockResolvedValue(mockUser);

    const result = await UserService.updateUserById("1", { name: "Novo Nome" });

    expect(mockUser.update).toHaveBeenCalledWith({ name: "Novo Nome" });
    expect(result).toBe(mockUser);
  });

  test("updateUserById deve retornar null se usuário não existir", async () => {
    jest.spyOn(UserService, "getUserById").mockResolvedValue(null);

    const result = await UserService.updateUserById("999", { name: "Nome" });

    expect(result).toBeNull();
  });

  test("deleteUserById deve marcar usuário como inativo", async () => {
    const mockUser = { update: jest.fn().mockResolvedValue(), id: "1" };
    jest.spyOn(UserService, "getUserById").mockResolvedValue(mockUser);

    const result = await UserService.deleteUserById("1");

    expect(mockUser.update).toHaveBeenCalledWith({ active: false });
    expect(result).toBe(mockUser);
  });

  test("deleteUserById deve retornar null se usuário não existir", async () => {
    jest.spyOn(UserService, "getUserById").mockResolvedValue(null);

    const result = await UserService.deleteUserById("999");

    expect(result).toBeNull();
  });

  //#endregion
});
