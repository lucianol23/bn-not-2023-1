const mongoose = require('mongoose')

const schema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        enum: ['un', 'kg','l'],
        required: true
    },
    price: {
        type: Number,
        min: 0.01,
        required: true
    },
    supplier: {
        type: mongoose.ObjectId,
        ref: 'Supplier', // nome do model relacionado
        required: true
    },
})

/*
Parametros de mongoose model:
1º nome do model para uso interno (convenção : primeira letra maiuscula e singular)
2º relação de camposa do esquema(constante schema)
3º nome da collection no banco de dados (convenção: mesmo nome do model, mas com letra miniscula e no plural)
*/

module.exports = mongoose.model('Product', schema, 'products') 