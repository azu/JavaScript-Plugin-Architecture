module.exports = {
    meta: { /* ルールのメタ情報 */ },
    create: function (context) {
        return {
            "MemberExpression": function (node) {
                if (node.object.name === "console") {
                    context.report(node, "Unexpected console statement.");
                }
            }
        };
    }
};
