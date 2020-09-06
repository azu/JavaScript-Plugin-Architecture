import { parse } from "esprima";
import { traverse } from "estraverse";
import { EventEmitter } from "events";

class RuleContext extends EventEmitter {
    report({ message }) {
        this.emit("report", message);
    }
}

export default class MyLinter {
    constructor() {
        this._emitter = new EventEmitter();
        this._ruleContext = new RuleContext();
    }

    loadRule(rule) {
        const ruleExports = rule.create(this._ruleContext);
        // on(nodeType, nodeTypeCallback);
        Object.keys(ruleExports).forEach(nodeType => {
            this._emitter.on(nodeType, ruleExports[nodeType]);
        });
    }


    lint(code) {
        const messages = [];
        const addMessage = (message) => {
            messages.push(message);
        };
        this._ruleContext.on("report", addMessage);
        const ast = parse(code);
        traverse(ast, {
            enter: (node) => {
                this._emitter.emit(node.type, node);
            },
            leave: (node) => {
                this._emitter.emit(`${node.type}:exit`, node);
            }
        });
        this._ruleContext.removeListener("report", addMessage);
        return messages;
    }
}
