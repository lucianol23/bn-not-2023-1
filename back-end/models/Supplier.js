const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    try: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
    //Subdocumento incorporado
    address: {
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        complement: {
            type: String,
            required: false
        },
        district: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: false
        }
    }
})

/*
Parametros de mongoose model:
1º nome do model para uso interno (convenção : primeira letra maiuscula e singular)
2º relação de camposa do esquema(constante schema)
3º nome da collection no banco de dados (convenção: mesmo nome do model, mas com letra miniscula e no plural)
*/

module.exports = mongoose.model('Supplier', schema, 'customers') 