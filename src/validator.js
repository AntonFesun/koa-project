const {
    default: validator,
    object,
    string
} = require('koa-context-validator');

exports.downloadValidator = validator({
   body: object().keys({
       name: string().required(),
       id: string().required(),
       type: string().required(),
       sex: string().required(),
       shape: string().required(),
       colorOfGlass: string().required(),
       gradient: string().required(),
       lenstype: string().required(),
       colorOfFrame: string().required(),
       material: string().required(),
       price: string().required(),
       description: string().required(),
       quantity: string().required()
   })
});