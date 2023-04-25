//Importação do model

const Sale = require('../models/Sale')

const controller =  {} // Objeto vazio

controller.create = async (req, res) => {
    try {
        //Manda as informações que vieram em req body
        //para serem gravdas no banco de dados
        await Sale.create(req.body)

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
        const result = await Sale.find().populate('customer')
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
        const result = await Sale.findById(req.params.id).populate('customer')
        
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
        
        // Encontra a venda para ser atualizado
        const sale = await Sale.findById(req.params.id)
        // Se itens tiver sido passado no body
        if(req.body.items){
            //percorre cada item de req.body, verificando se ja existe
            // ou não em sales.item
            for(let item of req.body.items){
                //Se o item tem _id é porque ja existe ~> É caso de atualização
                if(item._id){
                    
                    //Verifica se foi passado uma propriedade especial, chamada
                    //'$_delete', com o valor true e, nesse caso, deleta o subdocumento
                    if(item['$_delete']=== true){
                        sale.item.id(item._id).deleteOne()
                    }
                    else{
                       //Procura cada propriedade no item de req.body e 
                      for(let prop in item){
                        sale.items.id(item._id)[prop] = item[prop]
                      }
                    }
                }
                // item não existe -> É caso de inserção
                else {
                    sale.items.push(item) // Cria um novo item
                }
            }

            // Indica que o item foi modificado e deve ser regravado
            sale.markModified('items')


        }

        //Verifica as demais propriedades do pai (sale) por alterações
        for(let prop in req.body){
            if(prop !== 'items'){ // Items ja foi processado acima
                sale[prop] = req.body[prop]
                sale.markModified(prop)
            } 
        }

        const result = await sale.save()
        
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
        
        const result = await Sale.findByIdAndDelete(req.params.id)
        
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