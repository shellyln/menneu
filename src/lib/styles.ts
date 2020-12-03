// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


// @ts-ignore
import normalizeCss_     from 'normalize.css/normalize.min.css';
// @ts-ignore
import markdownCss_      from 'github-markdown-css/github-markdown.min.css';
// @ts-ignore
import markdownDarkCss_  from '../assets/dark-markdown.min.css';
// @ts-ignore
import highlightCss_     from 'highlight.js/styles/solarized-dark.min.css';
// @ts-ignore
import paperCss_         from 'paper-css/paper.min.css';

function stripDefault(x: any) {
    return x.default || x;
}

export const normalizeCss    = stripDefault(normalizeCss_);
export const markdownCss     = stripDefault(markdownCss_);
export const markdownDarkCss = stripDefault(markdownDarkCss_);
export const highlightCss    = stripDefault(highlightCss_);
export const paperCss        = stripDefault(paperCss_);
