// LICENSE : MIT
"use strict";
var TextLintEngine = require("textlint").TextLintEngine;
var gitbookParsers = require("gitbook-parsers");
var fs = require("fs");
var path = require("path");
var summaryFilePath = "./SUMMARY.md";

var engine = new TextLintEngine({
    rules: ["textlint-rule-spellcheck-tech-word"]
});
getFilePathListAsync(summaryFilePath).then(function (filePathList) {
    var results = engine.executeOnFiles(filePathList);
    var output = engine.formatResults(results);
    console.log(output);
});
function getFilePathListAsync(summaryFilePath) {
    var summaryDir = path.dirname(summaryFilePath);
    var summary = fs.readFileSync(summaryFilePath, "utf-8");
    var parser = gitbookParsers.get(".md");
    return parser.summary(summary)
        .then(function (summary) {
            return summary.chapters.filter(function (ch) {
                return ch.exists;
            }).map(function (ch) {
                return path.resolve(summaryDir, ch.path);
            });
        }).catch(function (error) {
            console.error(error);
        });
}
