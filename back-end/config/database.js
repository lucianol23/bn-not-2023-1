const mongoose = require('mongoose')

/*
    Usa desestruturação para obter as variaveis de
    ambiente necessarias para realizar a conexão ao
    banco de dados
*/

const {
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_SERVER,
    MONGODB_DATABASE
} = process.env

module.exports = function () {

    //Conecta ao banco de dados
    mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () =>
        console.log('=> MONGOOSE! conectado com sucesso ao servidor')
    )

    mongoose.connection.on('disconnected', () =>
        console.log('=>MONGOOSE! desconectado com sucesso do servidor')
    )

    mongoose.connection.on('error', error =>
        console.error('*** MONGOOSE! ERRO ao se conectar ao servidor: ' + error)
    )

    //Quando for detectado o comando de intervenção Ctrl+C
    process.on('SIGINT', () => {
        console.log('=> MONGOOSE! desconectado.....')
        mongoose.connection.close()
            //Encerra a aplicação sem erros
            process.exit(0)
        })
}
