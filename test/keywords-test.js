// LICENSE : MIT
"use strict";
import {getFilePathListAsync}  from "gitbook-summary-to-path";
let getKeywords = require("stemming-x-keywords").getKeywords;
import path from "path";
import fs from "fs";
import mdast from "mdast";
import parents from "unist-util-parents";
import select from "unist-util-select";
import isUnist from "unist-util-is";
import nlcstToString  from "nlcst-to-string";


const rootDir = path.join(__dirname, "..");
const keywordInfo = require("./keywords.json");
const Org = fs.readFileSync(__dirname + "/../ORGANIZATION.md", "utf-8");
function getSummary() {
    if (getSummary.cache) {
        return Promise.resolve(getSummary.cache);
    }
    return getFilePathListAsync(__dirname + "/../SUMMARY.md").then(fileList => {
        getSummary.cache = fileList;
        return fileList;
    });
}

function isNotContain(content, keywords) {
    // 含んでないものだけを返す
    return keywords.filter(keyword => {
        return content.indexOf(keyword) === -1;
    });
}
function findAllAfter(ast, node, type) {
    let results = [];
    let children = ast.children;
    let index = 0, length = children.length;
    let isFound = false;
    while (++index < length) {
        let child = children[index];
        if (isUnist(node, child)) {
            isFound = true;
        } else if (isFound) {
            if (isUnist(type, child)) {
                results.push(child);
            } else {
                break;
            }
        }
    }

    return results;
}
// キーワードが書くコンテンツに含まれているかをテストする
describe("keywords", function () {
    it("Each chapter contain the keyword", function () {
        let ast = mdast.parse(Org);
        let headerLinks = select(parents(ast), "heading link[href]");
        let filePathList = headerLinks.map(link => {
            return path.resolve(rootDir, link.href);
        });
        let paragraphList = headerLinks.map(link => {
            let filePath = path.resolve(rootDir, link.href);
            let paragraphs = findAllAfter(ast, link.parent.node, "paragraph");
            let results = {
                filePath: filePath,
                content: fs.readFileSync(filePath, "utf-8"),
                keywords: []
            };
            let keywords = paragraphs.map(p => {
                let text = nlcstToString(p);
                return getKeywords(text).then(a => {
                    results.keywords = results.keywords.concat(a)
                });
            });
            return Promise.all(keywords).then(()=> {
                return results;
            });
        });
        let promises = Promise.all(paragraphList).then(results => {
            return results.forEach(({filePath, content, keywords}) => {
                let unusedKeywords = isNotContain(content, keywords);
                if (unusedKeywords.length === 0) {
                    return;
                }
                throw new Error(`"${unusedKeywords.join(",")}" are not used in ${filePath}`);
            });
        });
        return promises;
    });
});
