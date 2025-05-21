const Joi = require("joi");

const createUserGameSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.empty": "ID do usuário é obrigatório",
    "string.guid": "ID do usuário deve ser um UUID válido",
    "any.required": "ID do usuário é obrigatório",
  }),

  gameId: Joi.number().integer().required().messages({
    "number.base": "ID do jogo deve ser um número",
    "number.integer": "ID do jogo deve ser um número inteiro",
    "any.required": "ID do jogo é obrigatório",
  }),

  finishedAt: Joi.date().required().messages({
    "date.base": "Data de finalização inválida",
    "any.required": "Data de finalização é obrigatória",
  }),

  rating: Joi.number().min(0).max(5).optional().messages({
    "number.base": "Avaliação deve ser um número",
    "number.min": "Avaliação mínima é 0",
    "number.max": "Avaliação máxima é 5",
  }),

  comment: Joi.string().allow("").optional().messages({
    "string.base": "Comentário deve ser um texto",
  }),
});

const updateUserGameSchema = Joi.object({
  finishedAt: Joi.date().required().messages({
    "date.base": "Data de finalização inválida",
    "any.required": "Data de finalização é obrigatória",
  }),

  rating: Joi.number().min(0).max(5).optional().messages({
    "number.base": "Avaliação deve ser um número",
    "number.min": "Avaliação mínima é 0",
    "number.max": "Avaliação máxima é 5",
  }),

  comment: Joi.string().allow("").optional().messages({
    "string.base": "Comentário deve ser um texto",
  }),
});

const validateGameIdParam = (req, res, next) => {
  const schema = Joi.number().integer().positive().required();
  const { error } = schema.validate(req.params.id);

  if (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "ID inválido. Deve ser um número válido.",
      });
  }
  next();
};

module.exports = {
  createUserGameSchema,
  updateUserGameSchema,
  validateGameIdParam,
};
