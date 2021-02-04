Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/02-async) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Cette fois-ci, nous allons utiliser le module npm [`node-fetch`](https://www.npmjs.com/package/node-fetch) qui emploie les _Promesses_ (`Promise`) au lieu des fonctions de _callback_.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[fetch-promise.js]({
  "stubs": ["3-promise.js"],
  "command": "node_modules/mocha/bin/mocha 3-promise.spec.js"
})
