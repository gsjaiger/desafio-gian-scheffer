class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: "Café", valor: 3.0 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
        suco: { descricao: "Suco Natural", valor: 6.2 },
        sanduiche: { descricao: "Sanduíche", valor: 6.5 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
      };
    }
  
    calcularValorDaCompra(metodoPagto, items) {
      if (items.length !== 0) {
        const { valor, erro } = this.verificarItems(items);
  
        if (erro) return erro;
  
        return this.verificarDesconto(metodoPagto, valor);
      }
      return "Não há itens no carrinho de compra!";
    }
  
    verificarDesconto(metodoPagto, valor) {
      const formasDePagamentoValidas = ["debito", "credito", "dinheiro"];
  
      if (!formasDePagamentoValidas.includes(metodoPagto)) return "Forma de pagamento inválida!";
      
      if (metodoPagto === "credito") {
        valor *= 1.03;
      } else if (metodoPagto === "dinheiro") {
        valor *= 0.95;
      }
      return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }
  
    verificarItems(itens) {
      const itExtras = ["queijo,sanduiche", "chantily,cafe"];
      let valor = 0;
      for (const itemQuantidade of itens) {
        const [itemCodigo, quantidade] = itemQuantidade.split(",");
        const produto = this.cardapio[itemCodigo];
  
        if (quantidade <= 0) return { valor, erro: "Quantidade inválida!" };
        else if (!produto) return { valor, erro: "Item inválido!" };
  
        let isExtraInvalido = true;
        itExtras.forEach((itemExtra) => {
          const [extra, principal] = itemExtra.split(",");

          if (itemCodigo === extra && !itens.some((produto) => produto.startsWith(principal))) {
            isExtraInvalido = false;
          }
        });
  
        if (!isExtraInvalido) {
          return { valor, erro: "Item extra não pode ser pedido sem o principal" };
        }
  
        valor += produto.valor * quantidade;
      }
  
      return { valor, erro: "" };
    }
  }
  
  export { CaixaDaLanchonete };
  