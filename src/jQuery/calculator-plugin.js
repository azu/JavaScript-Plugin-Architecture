"use strict";
import calculator from "./calculator";
calculator.fn.add = function (x) {
    this.value += x;
    return this;
};
calculator.fn.sub = function (x) {
    this.value -= x;
    return this;
};
calculator.fn.multi = function (x) {
    this.value *= x;
    return this;
};
calculator.fn.div = function (x) {
    this.value /= x;
    return this;
};