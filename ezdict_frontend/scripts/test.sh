#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/../config/karma.conf.js --log-level debug $*
karma start $BASE_DIR/../config/karma.dashboard.conf.js --log-level debug $*