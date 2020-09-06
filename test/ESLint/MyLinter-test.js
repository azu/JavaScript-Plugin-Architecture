// LICENSE : MIT
import assert from "power-assert";
import MyLinter from "../../src/ESLint/MyLinter";
import noConsole from "../../src/ESLint/no-console";
describe("MyLint", function () {
    it("should load and lint", function () {
        let linter = new MyLinter();
        linter.loadRule(noConsole);
        let results = linter.lint(`console.log("test")`);
        assert(results.length > 0);
        assert.equal(results[0], "Unexpected console statement.");
    });
});
