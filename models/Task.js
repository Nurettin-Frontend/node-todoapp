const mongoose = require('mongoose')
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    isActive: Boolean,
})


const validateTask = (body) => {
    const schema = Joi.object({
        isActive: Joi.boolean(),
        text: Joi.alternatives().
            conditional('isActive',
                {
                    is: true,
                    then: Joi.string()
                        .regex(/[ -~]*[a-z][ -~]*/, 'roles, 1 lower-case required at least') // at least 1 lower-case
                        .regex(/[ -~]*[A-Z][ -~]*/, 'roles, 1 upper-case required at least') // at least 1 upper-case
                        .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/, 'roles, 1 spacial required at least') // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
                        .regex(/[ -~]*[0-9][ -~]*/, 'roles, 1 number required at least') // at least 1 number
                        .required(),
                    otherwise: Joi.optional()
                })
    });
    return schema.validate(body);
};

const Task = mongoose.model('task', taskSchema)

exports.Task = Task
exports.validate = validateTask

