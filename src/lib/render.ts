// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { S,
         LM_async,
         LSX_async }                 from 'liyad/modules/s-exp/s-expression';
import { SxToken }                   from 'liyad/modules/s-exp/types';
import * as RedAgate                 from 'red-agate/modules';
import { default as requireDynamic } from './require-dynamic';
import { components }                from '../components';
import { getMarkdownRoot }           from '../components/Markdown';
import { RenderOptions }             from './types';
import { markdownHeader,
         markdownFooter }            from './fragments';
import { navigateOptionsDefault,
         imageOptionsDefault,
         pdfOptionsDefault }         from './defaults';

const path = requireDynamic('path');



function isSymbol(x: SxToken) {
    return typeof x === "object" && Object.prototype.hasOwnProperty.call(x, 'symbol');
}


function validateCode(s: string) {
    try {
        const sx = S(`""" ${s} """`) as SxToken[];
        if (! isSymbol(sx[0])) {
            throw new Error('Detect a toplevel triple double-quote.');
        }
    } catch (e) {
        throw new Error('[menneu] Triple double-quote is not allowed in the text. Please escape it by backslash.\n' + e);
    }
}


export async function render(source: string, data: any, options: RenderOptions) {
    const cs = Object.assign(
        { MarkdownRoot: getMarkdownRoot(options) },
        components,
    );
    const lsx = LSX_async({
        jsx: RedAgate.createElement,
        jsxFlagment: RedAgate.Template,
        components: options.noDefaultComponents ?
            options.components || {} :
            (options.components ? Object.assign(cs, options.components) : cs),
    });

    if (options.globals) {
        lsx.appendGlobals(options.globals);
    }

    let src = source;
    if (options.rawInput) {
        src = src
            .replace(/\\/g, '\\\\')
            .replace(/"""/g, '\\"\\"\\"')
            .replace(/%%%\(/g, '\\%\\%\\%(');
    }

    switch (options.inputFormat.toLowerCase()) {
    case 'markdown': case 'md':
        validateCode(src);
        src = `${markdownHeader(options)}${src}${markdownFooter()}`;
        break;
    case 'markdown-fragment': case 'md-fragment':
        validateCode(src);
        src = `(MarkdownRoot"""Markdown ${src} """)`;
        break;
    case 'html': case 'htm':
        validateCode(src);
        src = `(MarkdownRoot"""RawHtml ${src} """)`;
        break;
    case 'lsx': default:
        break;
    }

    if (data !== null && data !== void 0 && data !== '') {
        let d = null;
        switch (options.dataFormat) {
        case 'json':
            d = JSON.parse(data);
            break;
        case 'lisp':
            d = await LM_async(data);
            break;
        default:
            d = data;
            break;
        }
        lsx.appendGlobals({$data: d});
    }

    const html = await RedAgate.renderAsHtml(await lsx(src));

    if (options.launchOptions) {
        RedAgate.HtmlRenderer.launchOptions = options.launchOptions;
    }

    const ot = options.outputFormat.toLowerCase();
    let tempPath: string | undefined = void 0;
    if (options.tempDir && !options.useDataUrl) {
        tempPath = `${options.tempDir}${path.sep}mn-tmp-*.html`;
    }
    switch (ot) {
    case 'png': case 'jpeg':
        return RedAgate.HtmlRenderer.toImage(html,
            options.navigateOptions || navigateOptionsDefault,
            Object.assign({}, options.imageOptions || imageOptionsDefault, { type: ot }),
            tempPath);
    case 'pdf':
        return RedAgate.HtmlRenderer.toPdf(html,
            options.navigateOptions || navigateOptionsDefault,
            options.pdfOptions || pdfOptionsDefault,
            tempPath);
    case 'html': default:
        return Promise.resolve(Buffer.from(html, 'utf8'));
    }
}
