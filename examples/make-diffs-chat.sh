#!/bin/bash
# parent folder for files to compare
folder=/examples/chat/

# create dir for diffs
rm -rf ${PWD}${folder}_diff
mkdir ${PWD}${folder}_diff

# set working pwd
startPwd=${PWD}
cd ${PWD}${folder}

# diff a file
function buildDiff {
    echo $3
    diff -bdu $1 $2 > $3.diff
    diff2html -i file -s line --su hidden -F $3-line.html -- $3.diff
    diff2html -i file -s side --su hidden -F $3-side.html -- $3.diff
}

# diff a directory
function buildDiffDir {
    echo $3
    diff -bdur --new-file $1 $2 > $3.diff
    diff2html -i file -s line --su hidden -F $3-line.html -- $3.diff
    diff2html -i file -s side --su hidden -F $3-side.html -- $3.diff
}

# diff files
buildDiffDir server/client/ server/finish/ _diff/server-finish
buildDiffDir server/finish/ client/ _diff/client

# restore original pwd
cd ${startPwd}