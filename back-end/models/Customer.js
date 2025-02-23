const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true //campo obrigatorio
    },
    phone: {
        type: String,
        required: false
    },
    id_document: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false

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

module.exports = mongoose.model('Customer', schema, 'customers') 