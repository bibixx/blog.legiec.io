#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh $SSH_USERNAME@$SSH_HOSTNAME -o StrictHostKeyChecking=no <<-EOF
    cd $SSH_PROJECT_FOLDER
    git reset --hard
    git clean -f
    rm -rf node_modules
    git pull
    yarn
    yarn hexo clean
    yarn hexo generate
    rm -rf $SSH_COPY_TO/*
    cp -r ./public/* $SSH_COPY_TO
EOF
)