// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as hljs           from 'highlight.js';
import { MarkdownIt }      from 'markdown-it';
import * as rdgt           from 'red-agate/modules';
import { MarkdownOptions } from '../lib/types';

// TODO: If target is set to esmodule,,
//       and if you import "markdownit()" as "import * as markdownit from 'markdown-it'",
//       an error will be returned when it is called.

export const highlightJs = hljs;
// tslint:disable-next-line:no-var-requires
export const markdownit = require('markdown-it');
// tslint:disable-next-line:no-var-requires
export const mdiContaier = require('markdown-it-container');
// tslint:disable-next-line:no-var-requires
export const mdiEmoji = require('markdown-it-emoji');
// tslint:disable-next-line:no-var-requires
export const mdiSub = require('markdown-it-sub');
// tslint:disable-next-line:no-var-requires
export const mdiSup = require('markdown-it-sup');
// tslint:disable-next-line:no-var-requires
export const mdiCheckbox = require('markdown-it-checkbox');
// tslint:disable-next-line:no-var-requires
export const mdiPlantUml = require('markdown-it-plantuml');
// tslint:disable-next-line:no-var-requires
export const ascii2mathml = require('ascii2mathml'); // dummy for building "web" target.
// tslint:disable-next-line:no-var-requires
export const mdiMath = require('markdown-it-math');
// tslint:disable-next-line:no-var-requires
export const imsize = require('markdown-it-imsize');



const CONTEXT_MARKDOWN_ROOT = 'CONTEXT_MARKDOWN_ROOT_1le52hnkmrzi4b08';


export abstract class MdRootT extends rdgt.RedAgateComponent<rdgt.ComponentProps> {
    constructor(props: rdgt.ComponentProps) {
        super(props);
        throw new Error('MdRootT is dummy class to pass typescript type checking. You should call getMarkdownRoot() to construct MarkdownRoot.');
    }

    public transform(): rdgt.RedAgateNode {
        return this.props.children;
    }
}


export function getMarkdownIt(options: MarkdownOptions) {
    const md: MarkdownIt = markdownit({
        html: true,
        highlight(str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (e) {}
            }
            // use external default escaping
            return '';
        }
    });

    if (! options.noDefaultMarkdownPlugins) {
        md
        .use(mdiEmoji)
        .use(mdiSub)
        .use(mdiSup)
        .use(mdiCheckbox)
        .use(mdiPlantUml)
        .use(mdiMath)
        .use(imsize);
    }

    if (options.markdownCustomContainers) {
        for (const c of options.markdownCustomContainers) {
            const o = Object.assign({}, c);
            delete o.name;
            md.use(mdiContaier, c.name, o);
        }
    }

    if (options.markdownPlugins) {
        for (const p of options.markdownPlugins) {
            md.use(p.plugin, ...p.options);
        }
    }

    return md;
}


export function getMarkdownRoot(options: MarkdownOptions): typeof MdRootT {
    class MarkdownRoot extends rdgt.RedAgateComponent<rdgt.ComponentProps> {
        constructor(props: rdgt.ComponentProps) {
            super(props);
        }

        private created = false;

        public transform(): rdgt.RedAgateNode {
            return this.props.children;
        }

        public beforeRender(contexts: Map<string, any>): void {
            if (this.getContext(contexts, CONTEXT_MARKDOWN_ROOT)) {
                return;
            }

            this.setContext(contexts, CONTEXT_MARKDOWN_ROOT, getMarkdownIt(options));
            this.created = true;
        }

        public afterRender(contexts: Map<string, any>): void {
            if (this.created) {
                this.unsetContext(contexts, CONTEXT_MARKDOWN_ROOT);
                this.created = false;
            }
        }
    }
    return MarkdownRoot as any;
}


export interface MarkdownProps extends rdgt.ComponentProps {
    md?: markdownit.MarkdownIt;
    inline?: boolean;
}


export class Markdown extends rdgt.RedAgateComponent<MarkdownProps> {
    constructor(props: MarkdownProps) {
        super(props);
    }

    public transform(): rdgt.RedAgateNode {
        return this.props.children;
    }

    public render(contexts: Map<string, any>, children: string) {
        const c = children
            .replace(/&amp;/g, '&')
            .replace(/&#38;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&#62;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&#60;/g, '<')
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#39;/g, "'");

        const md: markdownit.MarkdownIt =
            this.getContext(contexts, CONTEXT_MARKDOWN_ROOT) ||
            getMarkdownIt({});

        if (this.props.inline) {
            return md.renderInline(c);
        } else {
            return md.render(c);
        }
    }
}
