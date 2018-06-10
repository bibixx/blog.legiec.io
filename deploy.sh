#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh $SSH_USERNAME@$SSH_HOSTNAME -o StrictHostKeyChecking=no <<-EOF
    cd $SSH_PROJECT_FOLDER
    git reset --hard
    rm -rf node_modules
    git pull
    npm install
    npm run hexo clean
    npm run hexo generate
    rm -rf $SSH_COPY_TO/*
    cp -r ./public/* $SSH_COPY_TO
EOF
)