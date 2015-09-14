"use strict";
import assert from "assert";
import MyLinter from "./MyLinter";
import noConsole from "./no-console";

let linter = new MyLinter();
linter.loadRule(noConsole);
let code = `
function add(x, y){
    console.log(x, y);
    return x + y;
}
add(1, 3);
`;
let results = linter.lint(code);
assert(results.length > 0);
assert.equal(results[0], "Unexpected console statement.");