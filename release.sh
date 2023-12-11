#!/usr/bin/env bash
set -eo pipefail

no_bump="${1:-bump}"

current="$(git rev-parse --abbrev-ref HEAD)"

declare -a branches=("gh-pages")

git fetch origin main

for b in "${branches[@]}"
do
    git checkout "$b"
    # 1. merge main first
    git merge --no-edit origin/main
    git push
done
# get back to current branch
git checkout $current
