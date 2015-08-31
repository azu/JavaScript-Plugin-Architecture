// LICENSE : MIT
"use strict";
import {parse} from "esprima";
import {traverse} from "estraverse";
import {EventEmitter} from "events";
class RuleContext extends EventEmitter {
    report(node, message) {
        this.emit("report", message);
    }
}
export default class MyLint extends EventEmitter {
    constructor() {
        super();
        this._emitter = new EventEmitter();
        this._ruleContext = new RuleContext();
        this._ruleContext.on("report", (message) => {
            this.emit("report", message);
        });
    }

    loadPlugin(plugin) {
        var rule = plugin(this._ruleContext);
        // on(nodeType, nodeTypeCallback);
        Object.keys(rule).forEach(nodeType => {
            this._emitter.on(nodeType, rule[nodeType]);
        });
    }


    lint(code) {
        var ast = parse(code);
        traverse(ast, {
            enter: (node) => {
                this._emitter.emit(node.type, node);
            },
            leave: (node) => {
                this._emitter.emit(`${node.type}:exit`, node);
            }
        });
    }
}