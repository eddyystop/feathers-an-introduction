#!/bin/bash
# parent folder for files to compare
folder=/examples/step/

# create dir for diffs
rm -rf ${PWD}${folder}_diff
mkdir ${PWD}${folder}_diff

# set working pwd
startPwd=${PWD}
cd ${PWD}${folder}

# make 1 diff
function buildDiff {
    echo $3
    diff -du $1 $2 > $3.diff
    diff2html -i file -s line --su hidden -F $3-line.html -- $3.diff
    diff2html -i file -s side --su hidden -F $3-side.html -- $3.diff
}

# diff files
buildDiff 01/db-connector/1.js 01/rest/1.js _diff/01-rest-1
buildDiff 01/rest/1.js 01/rest/2.js _diff/01-rest-2
buildDiff 01/rest/2.js 01/websocket/1.js _diff/01-websocket-1
buildDiff 01/common/public/rest.html 01/common/public/socketio.html _diff/01-websocket-socketio
buildDiff 01/websocket/1.js 01/hooks/1.js _diff/01-hooks-1
buildDiff 01/hooks/1.js 01/hooks/2.js _diff/01-hooks-2
buildDiff 01/common/public/feathers-app.js 02/app/public/feathers-app.js _diff/02-app-feathers-app

# restore original pwd
cd ${startPwd}