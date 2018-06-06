#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh $SSH_USERNAME@$SSH_HOSTNAME -o StrictHostKeyChecking=no <<-EOF
    cd $SSH_PROJECT_FOLDER
    npm run hexo clean
    git pull
    rm -rf node_modules
    npm install
    npm run hexo generate
    rm -rf $SSH_COPY_TO/*
    cp -r ./public/* $SSH_COPY_TO
EOF
)