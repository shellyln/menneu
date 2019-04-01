// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { default as requireDynamic } from 'red-agate-util/modules/runtime/require-dynamic';



declare var __webpack_require__: any;
const isWebpack = typeof __webpack_require__ === 'function';


function stripDefault(x: any) {
    return x.default || x;
}


function req() {
    if (isWebpack) {
        // bundling them.
        return {
            // tslint:disable-next-line:no-var-requires
            normalizeCss: stripDefault(require('normalize.css/normalize.css')),
            // tslint:disable-next-line:no-var-requires
            markdownCss:  stripDefault(require('github-markdown-css/github-markdown.css')),
            // tslint:disable-next-line:no-var-requires
            highlightCss: stripDefault(require('highlight.js/styles/solarized-dark.css')),
            // tslint:disable-next-line:no-var-requires
            paperCss:     stripDefault(require('paper-css/paper.css')),
        };
    } else {
        return {
            normalizeCss: requireDynamic('normalize.css/normalize.css'),
            markdownCss:  requireDynamic('github-markdown-css/github-markdown.css'),
            highlightCss: requireDynamic('highlight.js/styles/solarized-dark.css'),
            paperCss:     requireDynamic('paper-css/paper.css'),
        };
    }
}

export const {
    normalizeCss,
    markdownCss,
    highlightCss,
    paperCss,
} = req();
