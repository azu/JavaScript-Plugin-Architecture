"use strict";
module.exports = function (context) {
    return {
        "MemberExpression": function (node) {
            if (node.object.name === "console") {
                context.report(node, "Unexpected console statement.");
            }
        }
    };
};