let apiKey;

function fetchAPI() {
  return fetch('/.netlify/functions/hello')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro na requisição');
      }
    });
}

function fetchGames(apiKey) {
  return fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro na requisição');
      }
    });
}

function armazenarNoCache(dados) {
  const cacheKey = 'jogos';
  const dadosParaArmazenar = {
    jogos: dados,
    timestamp: Date.now()
  };
  localStorage.setItem(cacheKey, JSON.stringify(dadosParaArmazenar));
  return dadosParaArmazenar;
}

function distribuirJogos(dadosCache) {
  const imgJogos = localStorage.getItem('imgJogos');
  
  let bannerPrincipal = document.querySelector(".img_jogos");


  let img_jogos1 = document.querySelector("#img_jogos1");
  let img_jogos2 = document.querySelector("#img_jogos2");
  let img_jogos3 = document.querySelector("#img_jogos3");
  let img_jogos4 = document.querySelector("#img_jogos4");

  img_jogos1.src = dadosCache.jogos[16].background_image;
  img_jogos2.src = dadosCache.jogos[17].background_image;
  img_jogos3.src = dadosCache.jogos[18].background_image;
  img_jogos4.src = dadosCache.jogos[19].background_image;

  //carousel
  const imgJogosBannerHome = document.querySelector("#imgJogosBannerHome");
  const imgJogoBanner = document.querySelectorAll("#imgJogosBannerHome img");
  const carouselContainer = document.querySelector("#slider");

  let idx = 0;

  function carrosel() {
    idx++;

    if (idx > imgJogoBanner.length - 1) {
      idx = 0;
    }

    const carouselWidth = carouselContainer.clientWidth;
    imgJogosBannerHome.style.transform = `translateX(${-idx * carouselWidth}px)`;
  }

  setInterval(carrosel, 1800);

  function cardsHome() {
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

    for (let i = 0; i < cards.length; i++) {
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
        notasCard.style.borderColor = "#F1A81B";
        notasCard.style.color = "#F1A81B";
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
            break;
        }
      }
    }
  }

  cardsHome();
}

// Execução sequencial das operações
fetchAPI()
  .then(data => {
    apiKey = data.apiKey;
    return fetchGames(apiKey);
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

      const jogoArmazenado = {
        name: nomeJogo,
        metacritic: nota,
        background_image: imgJogo,
        platforms: plataformas,
        parent_platforms: plataformas_pais
      };

      jogosArmazenados.push(jogoArmazenado);
    });

    return armazenarNoCache(jogosArmazenados);
  })
  .then(dadosCache => {
    distribuirJogos(dadosCache);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });


//trocando cor do site(dakmode)

document.addEventListener("DOMContentLoaded", function() {
  let chageColorTheme = document.querySelector("#chageColorTheme");
  // Restante do código que adiciona o evento ao botão

  let isDarkMode = false;

chageColorTheme.addEventListener("click", function(){
  toggleDarkMode();
})


function applyDarkMode() {
  document.body.style.backgroundColor = "#1F1F1F";

  var elementosP = document.querySelectorAll('p');
  var elementosSpan = document.querySelectorAll('span');
  var elementosSvg = document.querySelectorAll('svg');
  var elementosInput = document.querySelectorAll('input');
  var cardGame = document.querySelectorAll('.cardGame');
  var elementosSelect = document.querySelectorAll('select');
  var elementosOptionSelect = document.querySelectorAll('option');

  elementosP.forEach(function(elemento) {
    elemento.classList.add('colorPDark');
  });

  elementosSpan.forEach(function(elemento) {
    elemento.classList.add('colorSpanDark');
  });

  elementosSvg.forEach(function(elemento) {
    elemento.classList.add('colorSvgDark');
  });

  elementosInput.forEach(function(elemento) {
    elemento.classList.add('colorInputDark');
  });

  cardGame.forEach(card => {
    card.classList.add('colorCardDark');
  });

  elementosSelect.forEach(select => {
    select.classList.add('colorSelectDark');
  });

  elementosOptionSelect.forEach(option => {
    option.classList.add('colorOptionSelectDark');
  });
}


function removeDarkMode() {
  document.body.style.backgroundColor = "#FFFFFF";

  var elementosP = document.querySelectorAll('p');
  var elementosSpan = document.querySelectorAll('span');
  var elementosSvg = document.querySelectorAll('svg');
  var elementosInput = document.querySelectorAll('input');
  var cardGame = document.querySelectorAll('.cardGame');
  var elementosSelect = document.querySelectorAll('select');
  var elementosOptionSelect = document.querySelectorAll('option');

  elementosP.forEach(function(elemento) {
    elemento.classList.remove('colorPDark');
  });

  elementosSpan.forEach(function(elemento) {
    elemento.classList.remove('colorSpanDark');
  });

  elementosSvg.forEach(function(elemento) {
    elemento.classList.remove('colorSvgDark');
  });

  elementosInput.forEach(function(elemento) {
    elemento.classList.remove('colorInputDark');
  });

  cardGame.forEach(card => {
    card.classList.remove('colorCardDark');
  });

  elementosSelect.forEach(select => {
    select.classList.remove('colorSelectDark');
  });

  elementosOptionSelect.forEach(option => {
    option.classList.remove('colorOptionSelectDark');
  });
}

// Função para alternar o dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    applyDarkMode();
  } else {
    removeDarkMode();
  }
}

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
    cardsOthersCategories.style.display = "grid";
    var cardsXbox = "";


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
      xboxJogos.push(data.results);
      })
      .catch(error => {
      console.error('Erro:', error);
      });
      promises.push(promise);
    }

    var arrayJogosXbox = [];
    Promise.all(promises)
      .then(() => {
      for (let i = 0; i < xboxJogos.length; i++){
          for (let a = 0; a < xboxJogos[i].length; a++){
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
                  arrayJogosXbox.push(xboxJogos[i][a]);
                } 
            }
            
          }
      }

      for (var i = 0; i < 12; i++) {
      cardsXbox += `
      <div id="cardGame${i}" class="cardGame">
          <img id="imgCardGame${i}"  src=${arrayJogosXbox[i].background_image} alt="" class="imgCard">
          <span id="plataformas${i}" class="plataformas">
              <svg style="display: block;" class="svgXbox" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7.1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z"/></svg>
              <svg style="display: ${arrayJogosXbox[i].parent_platforms[0].platform.id == 1 ? 'block' : 'none'};" class="svgPC" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
          </span>
          <span id="notasCard${i}" class="notasCard" style="color:${arrayJogosXbox[i].metacritic <= 25 ? 'red' : arrayJogosXbox[i].metacritic <= 50 ? 'orange' : arrayJogosXbox[i].metacritic <= 75 ? '#F1A81B' : 'green'}; border:${arrayJogosXbox[i].metacritic <= 25 ? '2px solid red' : arrayJogosXbox[i].metacritic <= 50 ? '2px solid orange' : arrayJogosXbox[i].metacritic <= 75 ? '2px solid #F1A81B' : '2px solid green'}; display:${arrayJogosXbox[i].metacritic == null ? 'none' : 'grid'};">${arrayJogosXbox[i].metacritic}</span>
          <p id="nameGame${i}" class="nameCard">${arrayJogosXbox[i].name}</p>
      </div>`;

      
    }
    cardsOthersCategories.innerHTML = cardsXbox;
    if (isDarkMode) {
      applyDarkMode();
    }
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
    
})

playstationContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";

    outrasCategorias.style.display = "block";
    cardsOthersCategories.style.display = "grid";
    var cardsPlay = "";


    var promises = [];
    var playJogos = [];
    for(var w = 1; w < 50; w++){
      var promise = fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${w}`)
      .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação: ' + response.status);
      }
      return response.json();
      })
      .then(data => {
      playJogos.push(data.results);
      })
      .catch(error => {
      console.error('Erro:', error);
      });

      promises.push(promise);
    }

    var arrayPlayJogos = [];
    Promise.all(promises)
      .then(() => {
      for (let i = 0; i < playJogos.length; i++){
          for (let a = 0; a < playJogos[i].length; a++){
            var PC = false;
            var Play = false;
            var outroConsole = false;
            for(let g = 0; g < playJogos[i][a].parent_platforms.length; g++){
                if(playJogos[i][a].parent_platforms.length == 2){
                  if(playJogos[i][a].parent_platforms[g].platform.id == 1){
                    PC = true;
                  }else if(playJogos[i][a].parent_platforms[g].platform.id == 2){
                    Play = true;
                  }else{
                    outroConsole = true;
                  }
                }
                if(((PC == true && Play == true) || Play == true) && outroConsole == false){
                  arrayPlayJogos.push(playJogos[i][a]);
                } 
            }
            
          }
      }

      for (var i = 0; i < 12; i++) {
      cardsPlay += `
      <div id="cardGame${i}" class="cardGame">
          <img id="imgCardGame${i}"  src=${arrayPlayJogos[i].background_image} alt="" class="imgCard">
          <span id="plataformas${i}" class="plataformas">
          <svg style="display: block;" class="svgPlaystation" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9.6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z"/></svg>
              <svg style="display: ${arrayPlayJogos[i].parent_platforms[0].platform.id == 1 ? 'block' : 'none'};" class="svgPC" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
          </span>
          <span id="notasCard${i}" class="notasCard" style="color:${arrayPlayJogos[i].metacritic <= 25 ? 'red' : arrayPlayJogos[i].metacritic <= 50 ? 'orange' : arrayPlayJogos[i].metacritic <= 75 ? '#F1A81B' : 'green'}; border:${arrayPlayJogos[i].metacritic <= 25 ? '2px solid red' : arrayPlayJogos[i].metacritic <= 50 ? '2px solid orange' : arrayPlayJogos[i].metacritic <= 75 ? '2px solid #F1A81B' : '2px solid green'}; display:${arrayPlayJogos[i].metacritic == null ? 'none' : 'grid'};">${arrayPlayJogos[i].metacritic}</span>
          <p id="nameGame${i}" class="nameCard">${arrayPlayJogos[i].name}</p>
      </div>`;

      
    }
    cardsOthersCategories.innerHTML = cardsPlay;
    if (isDarkMode) {
      applyDarkMode();
    }
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
})

nintendoContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";


  outrasCategorias.style.display = "block";
    cardsOthersCategories.style.display = "grid";
    var cardsNintendo = "";


    var promises = [];
    var nintendoJogos = [];
    for(var w = 1; w < 300; w++){
      var promise = fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${w}`)
      .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação: ' + response.status);
      }
      return response.json();
      })
      .then(data => {
      nintendoJogos.push(data.results);
      })
      .catch(error => {
      console.error('Erro:', error);
      });

      promises.push(promise);
    }

    var arrayNintendoJogos = [];
    Promise.all(promises)
      .then(() => {
      for (let i = 0; i < nintendoJogos.length; i++){
          for (let a = 0; a < nintendoJogos[i].length; a++){
            var PC = false;
            var Nintendo = false;
            var outroConsole = false;
            for(let g = 0; g < nintendoJogos[i][a].parent_platforms.length; g++){
                if(nintendoJogos[i][a].parent_platforms.length == 2){
                  if(nintendoJogos[i][a].parent_platforms[g].platform.id == 1){
                    PC = true;
                  }else if(nintendoJogos[i][a].parent_platforms[g].platform.id == 7){
                    Nintendo = true;
                  }else{
                    outroConsole = true;
                  }
                }
                if(((PC == true && Nintendo == true) || Nintendo == true) && outroConsole == false){
                  arrayNintendoJogos.push(nintendoJogos[i][a]);
                } 
            }
            
          }
      }

      for (var i = 0; i < 12; i++) {
      cardsNintendo += `
      <div id="cardGame${i}" class="cardGame">
          <img id="imgCardGame${i}"  src=${arrayNintendoJogos[i].background_image} alt="" class="imgCard">
          <span id="plataformas${i}" class="plataformas">
          <svg style="display: block;" class="svgNintendo" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z"/></svg>
              <svg style="display: ${arrayNintendoJogos[i].parent_platforms[0].platform.id == 1 ? 'block' : 'none'};" class="svgPC" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
          </span>
          <span id="notasCard${i}" class="notasCard" style="color:${arrayNintendoJogos[i].metacritic <= 25 ? 'red' : arrayNintendoJogos[i].metacritic <= 50 ? 'orange' : arrayNintendoJogos[i].metacritic <= 75 ? '#F1A81B' : 'green'}; border:${arrayNintendoJogos[i].metacritic <= 25 ? '2px solid red' : arrayNintendoJogos[i].metacritic <= 50 ? '2px solid orange' : arrayNintendoJogos[i].metacritic <= 75 ? '2px solid #F1A81B' : '2px solid green'}; display:${arrayNintendoJogos[i].metacritic == null ? 'none' : 'grid'};">${arrayNintendoJogos[i].metacritic}</span>
          <p id="nameGame${i}" class="nameCard">${arrayNintendoJogos[i].name}</p>
      </div>`;

      
    }
    cardsOthersCategories.innerHTML = cardsNintendo;
    if (isDarkMode) {
      applyDarkMode();
    }
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
})

pcContentLi.addEventListener("click", function(){
  let mainContent = document.querySelector(".main");
  mainContent.style.display = "none";

  outrasCategorias.style.display = "block";
    cardsOthersCategories.style.display = "grid";
    var cardsPC = "";


    var promises = [];
    var pcJogos = [];
    for(var w = 1; w < 150; w++){
      var promise = fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${w}`)
      .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação: ' + response.status);
      }
      return response.json();
      })
      .then(data => {
      pcJogos.push(data.results);
      })
      .catch(error => {
      console.error('Erro:', error);
      });

      promises.push(promise);
    }

    var arrayPCJogos = [];
    Promise.all(promises)
      .then(() => {
      for (let i = 0; i < pcJogos.length; i++){
          for (let a = 0; a < pcJogos[i].length; a++){
            var PC = false;
            var outroConsole = false;
            for(let g = 0; g < pcJogos[i][a].parent_platforms.length; g++){
                if(pcJogos[i][a].parent_platforms.length == 1){
                  if(pcJogos[i][a].parent_platforms[g].platform.id == 1){
                    PC = true;
                  }else{
                    outroConsole = true;
                  }
                }
                if(PC == true && outroConsole == false){
                  arrayPCJogos.push(pcJogos[i][a]);
                } 
            }
            
          }
      }

      for (var i = 0; i < 12; i++) {
      cardsPC += `
      <div id="cardGame${i}" class="cardGame">
          <img id="imgCardGame${i}"  src=${arrayPCJogos[i].background_image} alt="" class="imgCard">
          <span id="plataformas${i}" class="plataformas">
              <svg style="display: ${arrayPCJogos[i].parent_platforms[0].platform.id == 1 ? 'block' : 'none'};" class="svgPC" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707075}</style><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
          </span>
          <span id="notasCard${i}" class="notasCard" style="color:${arrayPCJogos[i].metacritic <= 25 ? 'red' : arrayPCJogos[i].metacritic <= 50 ? 'orange' : arrayPCJogos[i].metacritic <= 75 ? '#F1A81B' : 'green'}; border:${arrayPCJogos[i].metacritic <= 25 ? '2px solid red' : arrayPCJogos[i].metacritic <= 50 ? '2px solid orange' : arrayPCJogos[i].metacritic <= 75 ? '2px solid #F1A81B' : '2px solid green'}; display:${arrayPCJogos[i].metacritic == null ? 'none' : 'grid'};">${arrayPCJogos[i].metacritic}</span>
          <p id="nameGame${i}" class="nameCard">${arrayPCJogos[i].name}</p>
      </div>`;

      
    }
    cardsOthersCategories.innerHTML = cardsPC;
    if (isDarkMode) {
      applyDarkMode();
    }
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
})
});

