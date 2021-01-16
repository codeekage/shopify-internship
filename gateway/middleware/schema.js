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
  name: Joi.string().min(5).required(),
  metadata: Joi.string(),
  description: Joi.string(),
  watermark: Joi.bool(),
});

const imageUpdateSchema = Joi.object({
  permission: Joi.string().valid('private', 'public'),
  price: Joi.number().min(100),
  discount: Joi.number().min(1),
  imageId: Joi.string().length(24).required(),
  description: Joi.string(),
}).or('permission', 'discount', 'price', 'description');

const readImageSchema = Joi.object({
  imageId: Joi.string().length(24).required(),
});

const purchaseImageSchema = Joi.object({
  imageId: Joi.string().length(24).required(),
});

const processImagePurchaseSchema = Joi.object({
  paymentId: Joi.string().length(30).required(),
  payerId: Joi.string().alphanum().required(),
});

module.exports = {
  schemaLoader,
  loginSchema,
  signUpSchema,
  imageUploadSchema,
  imageUpdateSchema,
  readImageSchema,
  processImagePurchaseSchema,
  purchaseImageSchema,
};
