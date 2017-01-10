#!/bin/bash
folder=/examples/step/
cd ${PWD}${folder}

function buildDiff {
    echo $3
    diff -u $1 $2 > $3.diff
    diff2html -i file -s line -F $3-line.html -- $3.diff
    diff2html -i file -s side -F $3-side.html -- $3.diff
}

buildDiff 01/a/1.js 01/b/1.js diff/01-b-1