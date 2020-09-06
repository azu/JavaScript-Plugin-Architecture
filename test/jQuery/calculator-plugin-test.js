// LICENSE : MIT
import assert from "power-assert";
import calculator from "../../src/jQuery/calculator";
import "../../src/jQuery/calculator-plugin";
describe("calculator-plugin", function () {
    describe("#add", function () {
        it("should add value", function () {
            assert.equal(calculator(0).add(10).value, 10);
        });
    });
    describe("#sub", function () {
        it("should subtraction value", function () {
            assert.equal(calculator(0).sub(10).value, -10);
        });
    });
    describe("#multi", function () {
        it("should multiply value", function () {
            assert.equal(calculator(0).add(10).multi(10).value, 10 * 10);
        });
    });
    describe("#div", function () {
        it("should subtraction value", function () {
            assert.equal(calculator(0).add(10).div(2).value, 10 / 2);
        });
    });
});
