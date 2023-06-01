// Acesse a variável de ambiente da chave da API
const apiKey = process.env.API_KEY;

// Use a chave da API em suas chamadas para a API RAWG
fetch(`https://api.rawg.io/games?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Manipule os dados da API aqui
  })
  .catch(error => {
    // Trate erros aqui
  });