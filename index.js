const express = require('express')
const app = express()
const produtoRoutes = require('./routes/produtoRoutes')

app.use(express.json())
app.use(produtoRoutes)

app.get('/', (req, res) => {
    res.send('Catálogo de Produtos')
})


app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000')
})
