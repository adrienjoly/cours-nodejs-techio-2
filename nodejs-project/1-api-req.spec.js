//const assert = require('assert');
const expect = require("expect.js");
const { getStubFile, runStudentCode, congratulateStudent } = require("./common/techio");

const EXPECTED_RESPONSE = require("./common/expected-response.js")

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename); // "1-api-req.js"

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
    expect(program.getLogs().length > 0).to.be(true);
  });

  it("n'écrire que la réponse (format JSON) de la requête", () => {
    expect(program.getLogs().join("").trim()).to.match(/^\{/);
    JSON.parse(program.getLogs().join("").trim());
  });

  it("écrire correctement la réponse retournée par l'API", () => {
    const json = JSON.parse(program.getLogs().join("").trim());
    //assert(/hello/i.test(logged.join()));
    expect(json).to.eql(EXPECTED_RESPONSE);
    congratulateStudent();
  });
});
