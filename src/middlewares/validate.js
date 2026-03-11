const Joi = require('joi');

const registerSchema = Joi.object({
    name:     Joi.string().min(2).max(50).required(),
    email:    Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role:     Joi.string().valid('agent', 'manager', 'admin').required(),
});

const loginSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().required(),
});

const clientSchema = Joi.object({
    name:    Joi.string().min(2).max(100).required(),
    email:   Joi.string().email().required(),
    phone:   Joi.string().optional(),
    address: Joi.string().optional(),
    status:  Joi.string().valid('active', 'inactive', 'litigieux').optional(),
});

const invoiceSchema = Joi.object({
    client:      Joi.string().required(),
    amount:      Joi.number().positive().required(),
    dueDate:     Joi.date().required(),
    description: Joi.string().optional(),
    status:      Joi.string().valid('pending', 'paid', 'overdue', 'partial').optional(),
});

const paymentSchema = Joi.object({
    invoice: Joi.string().required(),
    amount:  Joi.number().positive().required(),
    note:    Joi.string().optional(),
});

const actionSchema = Joi.object({
    client:  Joi.string().required(),
    invoice: Joi.string().optional(),
    type:    Joi.string().valid('call', 'email', 'letter', 'visit', 'other').required(),
    note:    Joi.string().optional(),
    result:  Joi.string().valid('pending', 'promise', 'refused', 'no_answer').optional(),
});

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
           error: error.details.map(d => d.message).join(', ')
        });
    }
    next();
};

module.exports = {
    validateRegister: validate(registerSchema),
    validateLogin:    validate(loginSchema),
    validateClient:   validate(clientSchema),
    validateInvoice:  validate(invoiceSchema),
    validatePayment:  validate(paymentSchema),
    validateAction:   validate(actionSchema),
};