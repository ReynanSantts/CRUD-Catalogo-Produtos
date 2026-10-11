function validarProduto(produto) {

  if (produto == null || typeof produto !== "object" || Array.isArray(produto)) {
    return "Dados do produto inválidos";
  }

  if (
    typeof produto.nome !== "string" ||
    typeof produto.descricao !== "string" ||
    !produto.nome.trim() ||
    !produto.descricao.trim()
  ) {
    return "Por favor Prencha Nome e Descrição";
  }

  if (
    produto.peso == null ||
    produto.peso === "" ||
    produto.estoque == null ||
    produto.estoque === "" ||
    produto.preco == null ||
    produto.preco === ""
  ) {
    return "Peso, Preço e estoque sao obrigatórios";
  }

  if (
    !Number.isFinite(produto.peso) ||
    !Number.isFinite(produto.preco) ||
    !Number.isInteger(produto.estoque) ||
    produto.peso <= 0 ||
    produto.estoque < 0 ||
    produto.preco <= 0
  ) {
    return "Peso e Preço devem números positivos, e estoque deve ser um número inteiro";
  }

  return null;
}

module.exports = validarProduto;
