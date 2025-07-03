const produtos = [
  {
    nome: "Camiseta",
    preco: 49.90,
    categoria: "camiseta",
    imagem: "https://static.ferju.com.br/public/ferju/imagens/produtos/camiseta-unissex-adulto-manga-curta-lisa-ht102-har-textil-bordo-4329.jpg"
  },
  {
    nome: "Calça Jeans",
    preco: 129.90,
    categoria: "calca",
    imagem: "https://static.netshoes.com.br/produtos/calca-jeans-masculina-slim-premium-vilejack-vmcp0023/06/95P-0086-006/95P-0086-006_zoom1.jpg?ts=1708002525"
  },
  {
    nome: "Tênis",
    preco: 199.90,
    categoria: "tenis",
    imagem: "https://esportelegal.fbitsstatic.net/img/p/kit-tenis-adidas-grand-court-2-0-masculino-par-de-meia-122143/437411-1.jpg?w=800&h=800&v=no-value"
  },
  {
    nome: "Jaqueta",
    preco: 179.90,
    categoria: "jaqueta",
    imagem: "https://cdn.dooca.store/296/products/neperjaq004-c002-photoroom_1080x1080+fill_ffffff.png?v=1718228622&webp=0"
  },
  {
    nome: "Boné",
    preco: 39.90,
    categoria: "acessorio",
    imagem: "https://i.pinimg.com/474x/78/44/99/784499e9e76ad543fe353c7acf0dc075.jpg"
  },
  {
    nome: "Relógio",
    preco: 299.90,
    categoria: "acessorio",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbUkjZykYp7lLO0zvDjigHJBdi2sRJE7Fmg&s"
  },
  {
    nome: "Óculos de Sol",
    preco: 89.90,
    categoria: "acessorio",
    imagem: "https://vueglasses.com/cdn/shop/products/product_main_cygnus_sunglasses.png?v=1676979398"
  },
  {
    nome: "Shorts",
    preco: 59.90,
    categoria: "calca",
    imagem: "https://w7.pngwing.com/pngs/644/144/png-transparent-dri-fit-nike-gym-shorts-pants-nike-sporting-goods-jersey-trunks.png"
  },
  {
    nome: "Moletom",
    preco: 149.90,
    categoria: "jaqueta",
    imagem: "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/ivanvirt/catalog/whatsapp-image-2022-05-24-at-151058.jpeg"
  },
  {
    nome: "Chinelo",
    preco: 29.90,
    categoria: "tenis",
    imagem: "https://static.vecteezy.com/ti/fotos-gratis/p1/3023263-chinelo-de-praia-preto-sobre-fundo-branco-gratis-foto.JPG"
  },
  {
    nome: "Camisa Polo",
    preco: 69.90,
    categoria: "camiseta",
    imagem: "https://www.schoffelcountry.com/cdn/shop/files/schoffel-mens-st-ives-jersey-polo-shirt-navy-cutout-front-01.png?v=1718983393"
  },
  {
    nome: "Carteira",
    preco: 49.90,
    categoria: "acessorio",
    imagem: "https://m.media-amazon.com/images/I/81WIcyHQ7oL._UY1100_.jpg"
  }
];

const carrinho = [];

function atualizarCarrinho() {
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartItems = document.getElementById("cart-items");

  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    quantidadeTotal += item.quantidade;
  });

  cartCount.textContent = quantidadeTotal;
  cartTotal.textContent = total.toFixed(2);

  if (carrinho.length === 0) {
    cartItems.innerHTML = '<p>Carrinho vazio.</p>';
  } else {
    cartItems.innerHTML = '';

    carrinho.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.style.display = "flex";
      itemDiv.style.justifyContent = "space-between";
      itemDiv.style.marginBottom = "0.4rem";

      itemDiv.innerHTML = `
        <span>${item.nome} x ${item.quantidade}</span>
        <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        <button style="background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">X</button>
      `;

      const btnRemover = itemDiv.querySelector('button');
      btnRemover.addEventListener('click', () => {
        removerDoCarrinho(index);
      });

      cartItems.appendChild(itemDiv);
    });

    
    const btnFinalizar = document.createElement('button');
    btnFinalizar.textContent = 'Finalizar Compra';
    btnFinalizar.style.marginTop = '10px';
    btnFinalizar.style.padding = '6px 12px';
    btnFinalizar.style.cursor = 'pointer';
    btnFinalizar.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });

    cartItems.appendChild(btnFinalizar);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}

function adicionarAoCarrinho(produto) {
  // Verifica se produto já está no carrinho
  const index = carrinho.findIndex(item => item.nome === produto.nome);
  if (index > -1) {
    carrinho[index].quantidade++;
  } else {
    carrinho.push({...produto, quantidade: 1});
  }
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
}


function renderizarProdutos() {
  const lista = document.getElementById("product-list");
  lista.innerHTML = "";

  produtos.forEach(produto => {
    const item = document.createElement("div");
    item.className = "product";
    item.setAttribute("data-categoria", produto.categoria);
    item.setAttribute("data-preco", produto.preco);

    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button>Adicionar</button>
    `;

    const botao = item.querySelector("button");
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(produto);
    });

    lista.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos();
  atualizarCarrinho();

  const cartDiv = document.getElementById('cart');
  const cartItemsDiv = document.getElementById('cart-items');
  cartDiv.addEventListener('click', () => {
    if (cartItemsDiv.style.display === 'none' || cartItemsDiv.style.display === '') {
      cartItemsDiv.style.display = 'block';
    } else {
      cartItemsDiv.style.display = 'none';
    }
  });

  
  document.getElementById('finalizar-compra').addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
});

