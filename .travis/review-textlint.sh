#!/bin/bash

# Test if pull request
if [ "$TRAVIS_PULL_REQUEST" = "false" ] || [ -z "$TRAVIS_PULL_REQUEST" ]; then
  echo 'not pull request.'
  exit 0
fi

# Fetch other branch
# To avoid ambiguous argument
# http://stackoverflow.com/questions/37303969/git-fatal-ambiguous-argument-head-unknown-revision-or-path-not-in-the-workin
if [ "$TRAVIS" == "true" ]; then
  #resolving `detached HEAD` by attaching HEAD to the `TRAVIS_FROM_BRANCH` branch
  TRAVIS_FROM_BRANCH="travis_from_branch"
  git branch $TRAVIS_FROM_BRANCH
  git checkout $TRAVIS_FROM_BRANCH

  #fetching `TRAVIS_BRANCH` branch
  git fetch origin $TRAVIS_BRANCH
  git checkout -qf FETCH_HEAD
  git branch $TRAVIS_BRANCH
  git checkout $TRAVIS_BRANCH

  #switch to `TRAVIS_FROM_BRANCH`
  git checkout $TRAVIS_FROM_BRANCH
fi

# Install saddler
# https://github.com/packsaddle/ruby-saddler
# Need secret env: `GITHUB_ACCESS_TOKEN=xxx`
gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

# Diff Target Branch
# diff HEAD...target
# http://stackoverflow.com/questions/3161204/find-the-parent-branch-of-a-git-branch
# http://qiita.com/upinetree/items/0b74b08b64442f0a89b9
declare diffBranchName=$(git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -1 | awk -F'[]~^[]' '{print $2}')

# filter files and lint
echo "${diffBranchName}...HEAD"
echo "textlint -> review_comments"
git diff --name-only --diff-filter=ACMR ${diffBranchName} \
| grep -a '.*.md$' \
| xargs $(npm bin)/textlint -f checkstyle \
| checkstyle_filter-git diff ${diffBranchName} \
| saddler report \
    --require saddler/reporter/github \
    --reporter Saddler::Reporter::Github::PullRequestReviewComment
