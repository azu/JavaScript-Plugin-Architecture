import {parse} from "esprima";
import {traverse} from "estraverse";
import {EventEmitter} from "events";
class RuleContext extends EventEmitter {
    report(node, message) {
        this.emit("report", message);
    }
}
export default class MyLinter {
    constructor() {
        this._emitter = new EventEmitter();
        this._ruleContext = new RuleContext();
    }

    loadRule(rule) {
        let ruleExports = rule(this._ruleContext);
        // on(nodeType, nodeTypeCallback);
        Object.keys(ruleExports).forEach(nodeType => {
            this._emitter.on(nodeType, ruleExports[nodeType]);
        });
    }


    lint(code) {
        let messages = [];
        let addMessage = (message)=> {
            messages.push(message);
        };
        this._ruleContext.on("report", addMessage);
        let ast = parse(code);
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
