// LICENSE : MIT
"use strict";
import {getFilePathListAsync}  from "gitbook-summary-to-path";
import path from "path";
import fs from "fs";
const rootDir = path.join(__dirname, "..");
const keywordInfo = require("./keywords.json");

function getKeywords(matchPath) {
    return getFilePathListAsync(__dirname + "/../SUMMARY.md").then(fileList => {
        let filteredList = fileList.filter(filePath => {
            return filePath.indexOf(matchPath) !== -1;
        });
        return filteredList[0];
    }).then(filePath => {
        let relativePath = path.relative(rootDir, filePath);
        let content = fs.readFileSync(filePath, "utf-8");
        return {
            filePath,
            content,
            keywords: keywordInfo[relativePath]
        };
    });
}

function isNotContain(content, keywords) {
    // 含んでないものだけを返す
    return keywords.filter(keyword => {
        return content.indexOf(keyword) === -1;
    });
}
// キーワードが書くコンテンツに含まれているかをテストする
describe("keywords", function () {
    it("Each chapter contain the keyword", function (done) {
        let promises = Object.keys(keywordInfo).map(key => {
            return getKeywords(key).then(({filePath, content, keywords}) => {
                let unusedKeywords = isNotContain(content, keywords);
                if (unusedKeywords.length === 0) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error(`"${unusedKeywords.join(",")}" are not used in ${filePath}`));
                }
            });
        });
        Promise.all(promises).then(() => {
            done();
        }, done);
    });
});
