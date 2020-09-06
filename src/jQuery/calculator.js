function calculator(value = 0) {
    if (!(this instanceof calculator)) {
        return new calculator(value);
    }
    this.value = value;
}
// alias
calculator.fn = calculator.prototype;
export default calculator;
