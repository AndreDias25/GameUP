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

// let cardGame1 = document.querySelector("#cardGame1");
// let imgCardGame1 = document.querySelector("#imgCardGame1");
// let nameGame = document.querySelector("#nameGame1");
// let plataformas = document.querySelector(".plataformas");

// let svgPlaystation = document.querySelector(".svgPlaystation");
// let svgXbox = document.querySelector(".svgXbox");
// let svgPC = document.querySelector(".svgPC");
// let svgNintendo = document.querySelector(".svgNintendo");


// var platforms = dadosCache.jogos[1].parent_platforms;

// // Iterar sobre o array platforms
// for (var i = 0; i < platforms.length; i++) {
//   var platform = platforms[i];
//   var platformName = platform.platform.name;
  
//   // Criar um novo elemento de texto com o nome da plataforma
//   var textNode = document.createTextNode(platformName);

//   switch (platformName) {
//     case "Xbox":
//       svgXbox.style.display = "block"
//       break;
//     case "PlayStation":
//       svgPlaystation.style.display = "block"
//       break;
//     case "Nintendo":
//       svgNintendo.style.display = "block"
//       break;
//     case "PC":
//       svgPC.style.display = "block"
      
//       break;
//     default:
//       // Bloco de código para o caso padrão
//   }
// }
// let notas = document.querySelector(".notasCard");

// //cardGame1.innerHTML = dadosCache.jogos[1].platforms[0].platform.name
// imgCardGame1.src = dadosCache.jogos[1].background_image

// nameGame.textContent = dadosCache.jogos[1].name

// notas.textContent = dadosCache.jogos[1].metacritic

// if(dadosCache.jogos[1].metacritic <= 25){
//   notas.style.borderColor  = "red"
//   notas.style.color  = "red"
// }else if(dadosCache.jogos[1].metacritic <= 50){
//   notas.style.borderColor  = "orange"
//   notas.style.color  = "orange"
// }else if(dadosCache.jogos[1].metacritic <= 75){
//   notas.style.borderColor  = "yellow"
//   notas.style.color  = "yellow"
// }else{
//   notas.style.borderColor  = "green"
//   notas.style.color  = "green"
// }

//

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