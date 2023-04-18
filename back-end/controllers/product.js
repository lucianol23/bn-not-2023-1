//Importação do model

const Product = require('../models/Product')

const controller =  {} // Objeto vazio

controller.create = async (req, res) => {
    try {
        //Manda as informações que vieram em req body
        //para serem gravdas no banco de dados
        await Product.create(req.body)

        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)

    }
}

controller.retriveAll = async (req, res) =>{
    try{
        //Retorna todos os documentos do console
        const result = await Product.find().populate('supplier')
        //HTTP 200: OK(implicito)
        res.send(result)
    }
    catch(error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)

    }
}

controller.retriveOne = async (req, res) =>{
    try{
        //Retorna todos os documentos do console
        const result = await Product.findById(req.params.id).populate('supplier')
        
        if(result) {
            //Encontrou o documento => HTTP 200: OK (implicito)
            res.send(result)
        }
        else {
            //Não encontrou o documento => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) =>{
    try{
        
        const result = await Product.findByIdAndUpdate(req.params.id, req.body)
        
        if(result) {
            //Encontrou e atualizou => HTTP 204: No content
            res.send(204).end()
        }
        else {
            //Não encontrou para atualizar => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) =>{
    try{
        
        const result = await Product.findByIdAndDelete(req.params.id)
        
        if(result) {
            //Encontrou e excluiu => HTTP 204: No content
            res.send(204).end()
        }
        else {
            //Não encontrou para excluir => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module. exports = controller