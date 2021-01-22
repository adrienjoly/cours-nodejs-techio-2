#!/bin/bash

set -e # stop script on any non-zero exit code

function test {
  # Hide TECHIO messages to students, from printMessage()
  HIDE_TECHIO_MESSAGES=1 \
  CODE_FILE="$1.solution.js" \
  node_modules/mocha/bin/mocha "$1.spec.js"
}

cd nodejs-project
test "1-api-req"
test "2-callback-error"
test "3-promise"
test "4-promise-error"
test "5-await"
test "6-await-error"
test "7-complete"
