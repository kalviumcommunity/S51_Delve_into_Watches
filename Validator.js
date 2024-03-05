const Joi = require("joi");

const validtor = (schema)=> (data) =>
    schema.validate(data, {abortEarly: false})
const uppo = Joi.object({
    WatchID:Joi.string().required(),
    ModelName:Joi.string().required(),
    Company:Joi.string().required(),
    ProducedYear:Joi.number().required(),
})

const upap = validtor(uppo)

module.exports=upap