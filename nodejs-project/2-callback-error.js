const request = require('request');

request('https://serveur-inexistant.xyz', (error, response, body) => {

  // TODO: récupérer l'erreur de l'API puis l'afficher
  console.log('afficher l\'erreur à la place de cette chaîne de caractères');
});
