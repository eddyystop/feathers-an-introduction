#!/bin/bash
folder=/examples/step/
cd ${PWD}${folder}

function buildDiff {
    echo $3
    diff -du $1 $2 > $3.diff
    diff2html -i file -s line --su hidden -F $3-line.html -- $3.diff
    diff2html -i file -s side --su hidden -F $3-side.html -- $3.diff
}

buildDiff 01/a/1.js 01/b/1.js _diff/01-b-1