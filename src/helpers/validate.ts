import Joi from 'joi'

const email = Joi.string().pattern(new RegExp('gmail.com$')).required()
const password = Joi.string().min(6).required()
const image = Joi.string().required()
const itemName = Joi.string().required()
const price = Joi.number().required()

export { email, password, image, itemName as name, price }
