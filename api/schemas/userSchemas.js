const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
    "any.required": "Nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email é obrigatório",
    "string.email": "Email inválido",
    "any.required": "Email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Senha é obrigatória",
    "string.min": "Senha deve ter pelo menos 6 caracteres",
    "any.required": "Senha é obrigatória",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email é obrigatório",
    "string.email": "Email inválido",
    "any.required": "Email é obrigatório",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Senha é obrigatória",
    "any.required": "Senha é obrigatória",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
