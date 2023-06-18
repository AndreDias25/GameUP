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

let cardGame1 = document.querySelector("#cardGame1");
let imgCardGame1 = document.querySelector("#imgCardGame1");
let nameGame = document.querySelector("#nameGame");
let plataformas = document.querySelector(".plataformas");

let svgPlaystation = document.querySelector(".svgPlaystation");
let svgXbox = document.querySelector(".svgXbox");
let svgPC = document.querySelector(".svgPC");
let svgNintendo = document.querySelector(".svgNintendo");


var platforms = dadosCache.jogos[1].parent_platforms;

// Iterar sobre o array platforms
for (var i = 0; i < platforms.length; i++) {
  var platform = platforms[i];
  var platformName = platform.platform.name;
  
  // Criar um novo elemento de texto com o nome da plataforma
  var textNode = document.createTextNode(platformName);

  switch (platformName) {
    case "Xbox":
      svgXbox.style.display = "block"
      break;
    case "PlayStation":
      svgPlaystation.style.display = "block"
      break;
    case "Nintendo":
      svgNintendo.style.display = "block"
      break;
    case "PC":
      svgPC.style.display = "block"
      
      break;
    default:
      // Bloco de código para o caso padrão
  }
}
let notas = document.querySelector(".notasCard");

//cardGame1.innerHTML = dadosCache.jogos[1].platforms[0].platform.name
imgCardGame1.src = dadosCache.jogos[1].background_image

nameGame.textContent = dadosCache.jogos[1].name

notas.textContent = dadosCache.jogos[1].metacritic