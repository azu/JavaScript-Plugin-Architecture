import assert from "assert";
import MyLinter from "./MyLinter";
import noConsole from "./no-console";

const linter = new MyLinter();
linter.loadRule(noConsole);
const code = `
function add(x, y){
    console.log(x, y);
    return x + y;
}
add(1, 3);
`;
const results = linter.lint(code);
assert(results.length > 0);
assert.equal(results[0], "Unexpected console statement.");
