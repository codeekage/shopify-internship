const Joi = require('joi');

function schemaLoader(schema) {
  return (req, res, next) => {
    const queryBody = { ...req.body, ...req.params, ...req.query };
    const validate = schema.validate(queryBody);
    if (validate.error) {
      return res.status(400).json({
        success: false,
        error: validate.error.details[0].message,
      });
    }
    return next();
  };
}

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string().email().required(),
});

const imageUploadSchema = Joi.object({
  permission: Joi.string().valid('private', 'public').required(),
  price: Joi.number().min(100).required(),
  discount: Joi.number().min(1),
});

const imageUpdateSchema = Joi.object({
  permission: Joi.string().valid('private', 'public'),
  price: Joi.number().min(100),
  discount: Joi.number().min(1),
  imageId: Joi.string().length(24).required(),
}).or('permission', 'discount', 'price');

const readImageSchema = Joi.object({
  imageId: Joi.string().length(24).required(),
});

module.exports = {
  schemaLoader,
  loginSchema,
  signUpSchema,
  imageUploadSchema,
  imageUpdateSchema,
  readImageSchema,
};
