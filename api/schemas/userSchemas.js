const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .pattern(/^\s*\S+(?:\s+\S+)+\s*$/)
    .required()
    .messages({
      "string.empty": "Nome é obrigatório",
      "string.min": "Nome deve ter pelo menos 2 caracteres",
      "string.pattern.base": "Nome deve conter pelo menos um sobrenome",
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

const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .pattern(/^\s*\S+(?:\s+\S+)+\s*$/)
    .messages({
      "string.min": "Nome deve ter pelo menos 2 caracteres",
      "string.pattern.base": "Nome deve conter pelo menos um sobrenome",
    })
    .optional(),
  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email inválido",
    })
    .optional(),
  password: Joi.string()
    .min(6)
    .messages({
      "string.min": "Senha deve ter pelo menos 6 caracteres",
    })
    .optional(),
}).min(1);

const validateIdParam = (req, res, next) => {
  const schema = Joi.string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required();
  const { error } = schema.validate(req.params.id);

  if (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "ID inválido. Deve ser um UUID válido.",
      });
  }
  next();
};

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  validateIdParam,
};
