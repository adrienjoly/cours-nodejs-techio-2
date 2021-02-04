Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/02-async) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Sur la base de la solution à l'exercice précédent, nous allons envoyer une requête HTTP GET à un serveur qui n'existe pas et afficher dans la sortie standard l'erreur retournée par `fetch()` suite à l'échec de cette requête.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[promise-error.js]({
  "stubs": ["4-promise-error.js"],
  "command": "node_modules/mocha/bin/mocha 4-promise-error.spec.js"
})
