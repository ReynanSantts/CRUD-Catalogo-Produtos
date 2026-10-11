const conectar = require("../config/database");

async function listarProdutos() {
  const conexao = await conectar();

  try {
    const [resultado] = await conexao.execute("SELECT * FROM produtos");
    return resultado;
  } finally {
    await conexao.end();
  }
}

async function cadastrarProdutos(produto) {
  const conexao = await conectar();

  try {
    const [resultado] = await conexao.execute(
      "INSERT INTO produtos (nome, descricao, peso, estoque, preco, imagem) VALUES (?, ?, ?, ?, ?, ?)",
      [
        produto.nome,
        produto.descricao,
        produto.peso,
        produto.estoque,
        produto.preco,
        produto.imagem,
      ],
    );
    return resultado;
  } finally {
    await conexao.end();
  }
}

async function atualizarProduto(id, produto) {
  const conexao = await conectar();
  try {
    const [resultado] = await conexao.execute(
      "UPDATE produtos SET nome = ?, descricao = ?, peso = ?, estoque = ?, preco = ?, imagem = ? WHERE id = ?",
      [
        produto.nome,
        produto.descricao,
        produto.peso,
        produto.estoque,
        produto.preco,
        produto.imagem,
        id,
      ],
    );
    return resultado;
  } finally {
    await conexao.end();
  }
}

async function excluirProduto(id) {
  const conexao = await conectar();
  try {
    const [resultado] = await conexao.execute(
      "DELETE FROM produtos WHERE id = ?",
      [id],
    );
    return resultado;
  } finally {
    await conexao.end();
  }
}

async function verificarProdutoExistente(nome) {
  const conexao = await conectar();
  try {
    const [resultado] = await conexao.execute(
      "SELECT * FROM produtos WHERE LOWER(nome) =  LOWER(?) ",
      [nome],
    );
    return resultado;
  } finally {
    await conexao.end();
  }
}

async function buscarProdutoPorId(id) {
  const conexao = await conectar()

  try{
    const [resultado] = await conexao.execute("SELECT * FROM produtos WHERE id = ?",
      [id]
    )
    return resultado
  }
  finally{
    await conexao.end()
  }
}

module.exports = {
  listarProdutos,
  cadastrarProdutos,
  atualizarProduto,
  excluirProduto,
  verificarProdutoExistente,
  buscarProdutoPorId
};
