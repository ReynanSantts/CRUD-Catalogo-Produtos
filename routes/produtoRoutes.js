const express = require('express')
const router = express.Router()
const {buscarProdutos, criarProduto, editarProduto, deletarProduto, buscarProdutoId} = require('../controller/produtoController')

router.get('/produtos', buscarProdutos)
router.get('/produtos/:id', buscarProdutoId)
router.post('/produtos', criarProduto)
router.put('/produtos/:id', editarProduto)
router.delete('/produtos/:id', deletarProduto)



module.exports = router

