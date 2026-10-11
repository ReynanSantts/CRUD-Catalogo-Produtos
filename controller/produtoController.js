const {
  listarProdutos,
  cadastrarProdutos,
  atualizarProduto,
  excluirProduto,
  verificarProdutoExistente,
  buscarProdutoPorId,
} = require("../models/produtoModel");
const validarProduto = require("../utils/validarProduto");
const validarId = require("../utils/validarID");

async function buscarProdutos(req, res) {
  try {
    const produtos = await listarProdutos();

    res.json(produtos);
  } catch (erro) {
    console.error("Erro ao buscar Produtos", erro.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function criarProduto(req, res) {
  try {
    const produto = req.body;
    const erro = validarProduto(produto);

    if (erro) {
      return res.status(400).json({
        erro: erro,
      });
    }

    produto.nome = produto.nome.trim();
    produto.descricao = produto.descricao.trim();

    const existentes = await verificarProdutoExistente(produto.nome);

    if (existentes.length > 0) {
      return res.status(409).json({ erro: "Produto já Cadastrado" });
    }

    const resultado = await cadastrarProdutos(produto);

    res.status(201).json(resultado);
  } catch (erro) {
    console.error("Erro ao Cadastrar Produtos", erro.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function editarProduto(req, res) {
  try {
    const id = Number(req.params.id);
    const erroid = validarId(id);

    if (erroid) {
      return res.status(400).json({
        erro: erroid,
      });
    }
    const produto = req.body;
    const erro = validarProduto(produto);

    if (erro) {
      return res.status(400).json({
        erro: erro,
      });
    }

    produto.nome = produto.nome.trim();
    produto.descricao = produto.descricao.trim();

    const existentes = await verificarProdutoExistente(produto.nome);

    const duplicado = existentes.some((existente) => existente.id !== id);

    if (duplicado) {
      return res.status(409).json({
        erro: "Já existe outro produto com esse nome",
      });
    }

    const resultado = await atualizarProduto(id, produto);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    if (resultado.changedRows === 0) {
      return res.status(200).json({ mensagem: "Nenhuma alteração realizada" });
    }

    return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
  } catch (erro) {
    console.error("Erro ao Atualizar Produto", erro.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function deletarProduto(req, res) {
  try {
    const id = Number(req.params.id);
    const erro = validarId(id);

    if (erro) {
      return res.status(400).json({
        erro: erro,
      });
    }

    const resultado = await excluirProduto(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.status(200).json({
      mensagem: "Produto excluído com sucesso",
    });
  } catch (erro) {
    console.error("Erro ao Deletar Produto", erro.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function buscarProdutoId(req, res) {
  try {
    const id = Number(req.params.id);
    const erro = validarId(id);

    if (erro) {
      return res.status(400).json({
        erro: erro,
      });
    }

    const resultado = await buscarProdutoPorId(id);

    if (resultado.length === 0) {
      return res.status(404).json({
        erro: "Produto não encontrado",
      });
    }

    return res.status(200).json(resultado[0]);
  } catch (erro) {
    console.error("Erro ao Buscar Produto", erro.message);
    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
}

module.exports = {
  buscarProdutos,
  criarProduto,
  editarProduto,
  deletarProduto,
  buscarProdutoId,
};
