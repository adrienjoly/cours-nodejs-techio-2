﻿const expect = require("expect.js");
const { congratulateStudent, getStubFile, runStudentCode } = require("./common/techio");

const EXPECTED_RESPONSE = require("./common/expected-response.js")

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
    expect(program.getLogs().length > 0).to.be(true);
  });

  it("n'écrire que le texte de la réponse à la requête, tel quel", () => {
    expect(program.getLogs().join("").trim()).to.match(/^\{/);
    JSON.parse(program.getLogs().join("").trim());
  });

  it("afficher la réponse de l'API", () => {
    const json = JSON.parse(program.getLogs().join("").trim());
    expect(json).to.eql(EXPECTED_RESPONSE);
    congratulateStudent();
  });
});
