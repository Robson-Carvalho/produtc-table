const elementModal = document.createElement("div");
const productListing = document.querySelector(".product-listing");

const addQuoteOnLocalStorage = (value) => {
  localStorage.setItem("dollarExchangeRate", value.USDBRL.ask);
};

const getDollarToRealExchangeRate = fetch(
  "https://economia.awesomeapi.com.br/last/USD-BRL"
)
  .then((response) => response.json())
  .then((body) => addQuoteOnLocalStorage(body));

const dollarExchangeRate = Number(localStorage.getItem("dollarExchangeRate"));

const formatCurrencyToReal = (value) => {
  let money = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return money;
};

const formatCurrencyToDollar = (value) => {
  let money = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });
  return money;
};

const productData = [
  {
    productId: 0,
    name: "Apple iPhone 13",
    price: 1699.55,
    date: "16/03/2022",
    description:
      "iPhone 13. O sistema de câmera dupla mais avançado em um iPhone. Chip A15 Bionic com velocidade impressionante. Um grande salto em bateria. Projetado para durar. 5G ultrarrápido*. E tela Super Retina XDR mais brilhante",
    imgURL:
      "https://a-static.mlcdn.com.br/618x463/apple-iphone-13-256gb-estelar-tela-61-12mp-ios/magazineluiza/233009100/bac007e05df392577f9b7f7d595e1dda.jpg",
  },
  {
    productId: 1,
    name: "MacBook Pro",
    price: 1400,
    date: "16/03/2022",
    description:
      "O MacBook Pro de 13 polegadas* está voando com o chip M1 da Apple. Sua CPU de oito núcleos encara com rapidez fluxos de trabalho complexos em fotografia, programação, edição de vídeo e muito mais. A GPU de oito núcleos da conta de tarefas com gráficos pesados e roda muito melhor os jogos.",
    imgURL:
      "https://a-static.mlcdn.com.br/618x463/macbook-pro-133-apple-m1-8gb-256gb-ssd-cinza-espacial/magazineluiza/227626300/5965eed7d9519466b603a251455683df.jpg",
  },
  {
    productId: 2,
    name: "Tênis Nike Air Max 90",
    price: 179.15,
    date: "16/03/2022",
    description:
      "Não há nada mais legal, confortável ou tão comprovado. O Nike Air Max 90 permanece fiel às suas raízes de corrida originais, com a emblemática sola waffle, sobreposições costuradas e detalhes clássicos em TPU. As cores clássicas celebram seu visual renovado, enquanto o amortecimento Max Air aumenta o conforto da viagem.",
    imgURL:
      "https://images.lojanike.com.br/140x140/produto/tenis-nike-air-max-90-masculino-CN8490-100-1.jpg",
  },
  
];

if (productData) {
  productData.map((product) => {
    productListing.innerHTML += `
    <tr>
      <td>${product.productId + 1}</td>
      <td>${product.name}</td>
      <td>${product.date}</td>
      <td>${formatCurrencyToDollar(dollarExchangeRate)}</td>
      <td>${formatCurrencyToDollar(product.price)}</td>
      <td>${formatCurrencyToReal(product.price * dollarExchangeRate)}</td>
      <td><button onclick="modal(${product.productId})">Consultar</button></td>
    </tr>
    `;
  });
}else{
  
}

const modal = (id) => {
  elementModal.innerHTML = `
  <div class="modal">
    <button onclick="closeModal()">X</button>
    <img src="${productData[id].imgURL}" alt="Imagem do produto">
    <h3>${productData[id].name}</h3>
    <h4>${formatCurrencyToReal(productData[id].price * dollarExchangeRate)}</h4>
    <p>${productData[id].description}</p>
  </div>`;
  document.body.appendChild(elementModal);
};

const closeModal = () => {
  elementModal.innerHTML = "";
};
