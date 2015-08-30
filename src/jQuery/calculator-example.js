"use strict";
import assert from "assert";
import calculator from "./calculator";
import "./calculator-plugin"; // Extend

var resultValue = calculator(0).add(10).multi(10).value;
assert.equal(resultValue, 10 * 10);