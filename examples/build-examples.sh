#!/usr/bin/env bash
set -eu
trap 'echo Error at Line $LINENO "$@"' ERR

OUT_BASENAME=./debug/case-


MN_BASEDIR=./examples/markdown-demo
IN_BASENAME=$MN_BASEDIR/markdown-demo


CASE_NO=0001
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md --raw -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0002
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.html
node ./bin.cli/menneu.js ${IN_BASENAME}.md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf
node ./bin.cli/menneu.js ${IN_BASENAME}.md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.png

CASE_NO=0003
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md -ti -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0004
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md -tc -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0005
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md -to -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0006
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md -tm -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0007
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.data.lisp -i ${IN_BASENAME}.md -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=0008
echo $CASE_NO
node ./bin.cli/menneu.js - -if md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf < ${IN_BASENAME}.md

CASE_NO=0009
echo $CASE_NO
node ./bin.cli/menneu.js - -t $MN_BASEDIR -if md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf < ${IN_BASENAME}.md

CASE_NO=0010
echo $CASE_NO
node ./bin.cli/menneu.js - -c ${MN_BASEDIR}/menneu.config.js -t $MN_BASEDIR -if md -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf < ${IN_BASENAME}.md

CASE_NO=0011
echo $CASE_NO
node ./bin.cli/menneu.js - -df lisp -i ${IN_BASENAME}.md -o ${OUT_BASENAME}${CASE_NO}.pdf < ${IN_BASENAME}.data.lisp

CASE_NO=0012
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.md --dark-theme -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.html
node ./bin.cli/menneu.js ${IN_BASENAME}.md --dark-theme -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf
node ./bin.cli/menneu.js ${IN_BASENAME}.md --dark-theme -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.png


MN_BASEDIR=./examples/html-demo
IN_BASENAME=$MN_BASEDIR/html-demo


CASE_NO=1001
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.html --raw -o ${OUT_BASENAME}${CASE_NO}.pdf

CASE_NO=1002
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.html -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.html
node ./bin.cli/menneu.js ${IN_BASENAME}.html -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf
node ./bin.cli/menneu.js ${IN_BASENAME}.html -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.png


MN_BASEDIR=./examples/billing
IN_BASENAME=$MN_BASEDIR/billing


CASE_NO=2001
echo $CASE_NO
node ./bin.cli/menneu.js ${IN_BASENAME}.lsx -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.html
node ./bin.cli/menneu.js ${IN_BASENAME}.lsx -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.pdf
node ./bin.cli/menneu.js ${IN_BASENAME}.lsx -d ${IN_BASENAME}.data.lisp -o ${OUT_BASENAME}${CASE_NO}.png


echo Done!!
