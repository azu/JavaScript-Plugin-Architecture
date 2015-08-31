"use strict";
import assert from "assert";
import MyLinter from "./MyLinter";
import noConsole from "./noConsole";
let linter = new MyLinter();
linter.loadPlugin(noConsole);
var results = linter.lint(`console.log("test")`);
assert(results.length > 0);
assert.equal(results[0], "Unexpected console statement.");