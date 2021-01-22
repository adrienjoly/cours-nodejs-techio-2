const fs = require('fs');
const childProcess = require("child_process");

const showStdOutputs = !process.env.HIDE_TECHIO_MESSAGES;

exports.printMessage = (message, channel = "Finalisation de l'exercice") =>
  process.env.HIDE_TECHIO_MESSAGES
    ? {}
    : console.log(`TECHIO> message --channel "${channel}" "${message}"`);

exports.congratulateStudent = () => {
  exports.printMessage(`🏆  Bravo, ton programme a l'air de fonctionner correctement et de respecter les consignes de l'exercice !`);
  exports.printMessage(``);
  exports.printMessage(`Avant de passer à l'exercice suivant, pense à:`);
  exports.printMessage(`1. 🧹  nettoyer ton code, pour ne garder que les instructions et commentaires nécessaires à son bon fonctionnement;`);
  exports.printMessage(`2. 📝  ajouter des commentaires aux parties du code les moins évidentes, pour te souvenir à quoi elles servent;`);
  exports.printMessage(`3. 📒  puis à garder une copie du code dans tes notes de cours, de manière à les retrouver rapidement quand tu en auras besoin.`);
};

exports.getStubFile = (testFile) => './' + testFile.split('/').pop().replace('.spec.js', '.js');

exports.countLines = (sourceCode) => sourceCode.split(/[\r\n]+/).length;

const removeComments = str => str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');

exports.getStudentCode = (codeFile) => new Promise((resolve, reject) => {
  fs.readFile(codeFile, 'utf8', (err, data) => err ? reject(err) : resolve(removeComments(data)));
});

exports.runStudentCode = (codeFile, { args } = {}) => new Promise((resolve, reject) => {
  const logs = [];
  const errors = [];
  const timeout = setTimeout(() => reject("timeout"), 5000);
  // load and run student code
  const process = childProcess.fork(codeFile, args, {
    stdio: [0, "pipe", "pipe", "ipc"],
  });
  process.stdout.on("data", (data) => {
    data
      .toString()
      .split(/[\r\n]+/g)
      .forEach((str) => logs.push(str));
    if (showStdOutputs) {
      console.log(`    ℹ️  sortie standard du programme: ${data}`);
    }
  });
  process.stderr.on("data", (data) => {
    data
      .toString()
      .split(/[\r\n]+/g)
      .forEach((str) => errors.push(str));
    if (showStdOutputs) {
      console.log(`    ℹ️  sortie d'erreurs du programme: ${data}`);
    }
  });
  process.on("close", (code) => {
    clearTimeout(timeout);
    if (code === 0) {
      resolve({
        getLogs: () => logs,
        getErrors: () => errors,
      });
    } else {
      reject(`child process exited with code ${code}`);
    }
  });
});
