// fetch(`https://api.rawg.io/api/games?key=${config.apiKey}`)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Erro na requisição');
//     }
//   })
//   .then(data => {
//     // Armazenar os dados dos jogos, incluindo as URLs das imagens
//     console.log(data)
//     const jogos = data.results;
//     const jogosArmazenados = [];
//     // const imgJogos = data.results[0].background_image;
//     // console.log(imgJogos)

//     jogos.forEach(jogo => {
//         const nomeJogo = jogo.name;
//         const nota = jogo.metacritic;
//         const imgJogo = jogo.background_image;
//         const plataformas = jogo.platforms;
//         // Faça algo com a imagem do jogo, por exemplo:
//         console.log(nomeJogo, nota, imgJogo, plataformas);

//         const jogoArmazenado = {
//             name: imgJogo,
//             metacritic: nota, 
//             background_image: imgJogo,
//             platforms: plataformas
//         }

//          // Armazene o jogo no array temporário
//         jogosArmazenados.push(jogoArmazenado);
//       });
//     localStorage.setItem('jogos', JSON.stringify(jogosArmazenados));
//     // localStorage.setItem('imgJogos', imgJogos);
//   })
//   .catch(error => {
//     console.error(error);
//   });

const apiKey = config.apiKey;
const cacheKey = 'jogos';
const tempoExpiracao = 30 * 60 * 1000; // Tempo de expiração em milissegundos (30 minutos)

// Verificar se os dados estão armazenados no localStorage e estão dentro do tempo de expiração
const dadosCache = JSON.parse(localStorage.getItem(cacheKey));

if (dadosCache && Date.now() - dadosCache.timestamp < tempoExpiracao) {
  // Utilizar os dados do cache
  console.log('Usando dados do cache');
  console.log(dadosCache.jogos);
} else {
  // Fazer uma nova requisição à API
  console.log('Fazendo requisição à API');
  
  fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro na requisição');
      }
    })
    .then(data => {
      const jogos = data.results;
      const jogosArmazenados = [];

      jogos.forEach(jogo => {
        const nomeJogo = jogo.name;
        const nota = jogo.metacritic;
        const imgJogo = jogo.background_image;
        const plataformas = jogo.platforms;
        const plataformas_pais = jogo.parent_platforms;
        
        console.log(nomeJogo, nota, imgJogo, plataformas, plataformas_pais);
        
        const jogoArmazenado = {
          name: nomeJogo,
          metacritic: nota,
          background_image: imgJogo,
          platforms: plataformas,
          parent_platforms: plataformas_pais
        };
        
        jogosArmazenados.push(jogoArmazenado);
      });

      const dadosParaArmazenar = {
        jogos: jogosArmazenados,
        timestamp: Date.now()
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(dadosParaArmazenar));
    })
    .catch(error => {
      console.error(error);
    });
}

//Distribuindo jogos para o banner e os cards

const imgJogos = localStorage.getItem('imgJogos');
console.log(dadosCache)
let bannerPrincipal = document.querySelector(".img_jogos");
//first.src = imgJogos;
bannerPrincipal.src = imgJogos;


function cardsHome(){
    const cards = [
      {
        cardId: "cardGame1",
        imgId: "imgCardGame1",
        nameId: "nameGame1",
        plataformas: "plataformas1",
        notas: "notasCard1"
      },
      {
        cardId: "cardGame2",
        imgId: "imgCardGame2",
        nameId: "nameGame2",
        plataformas: "plataformas2",
        notas: "notasCard2"
      },
      {
        cardId: "cardGame3",
        imgId: "imgCardGame3",
        nameId: "nameGame3",
        plataformas: "plataformas3",
        notas: "notasCard3"
      },
      {
        cardId: "cardGame4",
        imgId: "imgCardGame4",
        nameId: "nameGame4",
        plataformas: "plataformas4",
        notas: "notasCard4"
      }
    ];

    for(let i = 0; i < cards.length; i++){
      const card = cards[i];
      const jogo = dadosCache.jogos[i];

      const imgCard = document.querySelector(`#${card.imgId}`);
      const nameCard = document.querySelector(`#${card.nameId}`);
      const plastaformasCard = document.querySelector(`#${card.plataformas}`);
      const notasCard = document.querySelector(`#${card.notas}`);

      imgCard.src = jogo.background_image;
      nameCard.textContent = jogo.name;
      notasCard.textContent = jogo.metacritic;

      if (jogo.metacritic <= 25) {
        notasCard.style.borderColor = "red";
        notasCard.style.color = "red";
      } else if (jogo.metacritic <= 50) {
        notasCard.style.borderColor = "orange";
        notasCard.style.color = "orange";
      } else if (jogo.metacritic <= 75) {
        notasCard.style.borderColor = "yellow";
        notasCard.style.color = "yellow";
      } else {
        notasCard.style.borderColor = "green";
        notasCard.style.color = "green";
      }

    const platforms = jogo.parent_platforms;
    const svgPlaystation = document.querySelector(`#${card.plataformas} .svgPlaystation`);
    const svgXbox = document.querySelector(`#${card.plataformas} .svgXbox`);
    const svgPC = document.querySelector(`#${card.plataformas} .svgPC`);
    const svgNintendo = document.querySelector(`#${card.plataformas} .svgNintendo`);

    svgPlaystation.style.display = "none";
    svgXbox.style.display = "none";
    svgPC.style.display = "none";
    svgNintendo.style.display = "none";


    for (let j = 0; j < platforms.length; j++) {
      const platformName = platforms[j].platform.name;
      
      switch (platformName) {
        case "Xbox":
          svgXbox.style.display = "block";
          break;
        case "PlayStation":
          svgPlaystation.style.display = "block";
          break;
        case "Nintendo":
          svgNintendo.style.display = "block";
          break;
        case "PC":
          svgPC.style.display = "block";
          break;
        default:
          // Bloco de código para o caso padrão
          break;
      }
    }
  }
}

cardsHome()

//trocando cor do site
var elementosP = document.querySelectorAll('p');
var elementosSpan = document.querySelectorAll('span');
var elementosSvg = document.querySelectorAll('svg');
var chageColorTheme = document.querySelector("#chageColorTheme");
chageColorTheme.addEventListener("click", function(){
    if(chageColorTheme.textContent == "light_mode"){
      chageColorTheme.textContent = "dark_mode";
      document.body.style.backgroundColor = "#1F1F1F";

      elementosP.forEach(function(elemento) {
        elemento.classList.add('colorPDark');
      });

      elementosSpan.forEach(function(elemento) {
        elemento.classList.add('colorSpanDark');
      });

      elementosSvg.forEach(function(elemento) {
        elemento.classList.add('colorSvgDark');
      });
    }else if(chageColorTheme.textContent == "dark_mode"){
      chageColorTheme.textContent = "light_mode";
      document.body.style.backgroundColor = "#FFFFFF";

      elementosP.forEach(function(elemento) {
        elemento.classList.remove('colorPDark');
      });

      elementosSpan.forEach(function(elemento) {
        elemento.classList.remove('colorSpanDark');
      });

      elementosSvg.forEach(function(elemento) {
        elemento.classList.remove('colorSvgDark');
      });
    }
})

//Troca de conteúdo
var homeContentLi = document.querySelector("#homeContentLi");
var xboxContentLi = document.querySelector("#xboxContentLi");
var playstationContentLi = document.querySelector("#playstationContentLi");
var nintendoContentLi = document.querySelector("#nintendoContentLi");
var pcContentLi = document.querySelector("#pcContentLi");
var outrasCategorias = document.querySelector(".outrasCategorias");
var cardsOthersCategories = document.querySelector(".cardsOthersCategories");

homeContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "block";
  outrasCategorias.style.display = "none";
})

xboxContentLi.addEventListener("click", function(){
    let mainContent = document.querySelector(".main");
    mainContent.style.display = "none";

    outrasCategorias.style.display = "block";
    cardsOthersCategories.style.display = "flex";
    var cardsXbox = "";

    for (var i = 0; i < 12; i++) {
      cardsXbox += `
      <div id="cardGame${i}" class="cardGame">
          <img id="imgCardGame${i}"  src="https://via.placeholder.com/170x170" alt="" class="imgCard">
          <span id="plataformas${i}" class="plataformas">
              <svg style="display: none;" class="svgXbox" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7.1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z"/></svg>
          </span>
          <span id="notasCard${i}" class="notasCard">8.0</span>
          <p id="nameGame${i}" class="nameCard">Title</p>
      </div>`;
    }
    // outrasCategorias.innerHTML = abrirDivCard;
    cardsOthersCategories.innerHTML = cardsXbox;


    var promises = [];
    var xboxJogos = [];
    for(var w = 1; w < 50; w++){
      var promise = fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${w}`)
      .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação: ' + response.status);
      }
      return response.json();
      })
      .then(data => {
      // Manipular os dados da resposta (data)
      //console.log(data);

      
      xboxJogos.push(data.results);
      //console.log(xboxJogos);
      })
      .catch(error => {
      // Lidar com erros
      console.error('Erro:', error);
      });

      promises.push(promise);
    }


    Promise.all(promises)
      .then(() => {
      //console.log(xboxJogos);
      // Aqui você pode acessar e manipular os dados em xboxJogos
      for (let i = 0; i < xboxJogos.length; i++){
          for (let a = 0; a < xboxJogos[i].length; a++){
            //console.log(xboxJogos[i][a])
            

            var PC = false;
            var Xbox = false;
            var outroConsole = false;
            for(let g = 0; g < xboxJogos[i][a].parent_platforms.length; g++){
                if(xboxJogos[i][a].parent_platforms.length == 2){
                  if(xboxJogos[i][a].parent_platforms[g].platform.id == 1){
                    PC = true;
                  }else if(xboxJogos[i][a].parent_platforms[g].platform.id == 3){
                    Xbox = true;
                  }else{
                    outroConsole = true;
                  }
                }
                if(((PC == true && Xbox == true) || Xbox == true) && outroConsole == false){
                  console.log(xboxJogos[i][a].name)
                } 
            }
            
          }
      }
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
    
})

playstationContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";
})

nintendoContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";
})

pcContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";
})