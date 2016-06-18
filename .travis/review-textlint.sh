#!/bin/bash

if [ "$CI_PULL_REQUEST" == false ] || [ -z "$CI_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == false ] || [ -z "$TRAVIS_PULL_REQUEST" ]; then
  echo 'not pull request.'
  exit 0
fi

gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

# Diff Target Branch
# diff HEAD...target
# http://stackoverflow.com/questions/3161204/find-the-parent-branch-of-a-git-branch
# http://qiita.com/upinetree/items/0b74b08b64442f0a89b9
diffBranchName=$(git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -1 | awk -F'[]~^[]' '{print $2}')
# 変更行のみを対象にする
git diff --name-only --diff-filter=ACMR ${diffBranchName} \
| grep -a '*.md$' \
| xargs $(npm bin)/textlint -f checkstyle \
| checkstyle_filter-git diff ${diffBranchName} \
| saddler report \
    --require saddler/reporter/github \
    --reporter Saddler::Reporter::Github::PullRequestReviewComment
