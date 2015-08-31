// LICENSE : MIT
"use strict";
import assert from "power-assert";
import MyLint from "../../src/ESLint/MyLint";
import noConsole from "../../src/ESLint/no-console";
describe("MyLint", function () {
    it("should load and lint", function () {
        let lint = new MyLint();
        lint.loadPlugin(noConsole);
        lint.on("report", (message)=> {
            assert.equal(message, "Unexpected console statement.");
        });
        lint.lint(`console.log("test")`);
    });
});
