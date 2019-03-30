// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { default as isNode } from '../lib/is-node';
import * as rdgt             from 'red-agate/modules';
import { MarkdownOptions }   from '../lib/types';
import { raw }               from './raw';

import * as hljs_  from 'highlight.js';
export const highlightJs: typeof hljs_ = (hljs_ as any).default || hljs_;

import * as markdownit_ from 'markdown-it';
export const markdownit: typeof markdownit_ = (markdownit_ as any).default || markdownit_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiContaier_ from 'markdown-it-container';
export const mdiContaier = (mdiContaier_ as any).default || mdiContaier_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiEmoji_ from 'markdown-it-emoji';
export const mdiEmoji = (mdiEmoji_ as any).default || mdiEmoji_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiSub_ from 'markdown-it-sub';
export const mdiSub = (mdiSub_ as any).default || mdiSub_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiSup_ from 'markdown-it-sup';
export const mdiSup = (mdiSup_ as any).default || mdiSup_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiCheckbox_ from 'markdown-it-checkbox';
export const mdiCheckbox = (mdiCheckbox_ as any).default || mdiCheckbox_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiPlantUml_ from 'markdown-it-plantuml';
export const mdiPlantUml = (mdiPlantUml_ as any).default || mdiPlantUml_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiMath_ from 'markdown-it-math';
export const mdiMath = (mdiMath_ as any).default || mdiMath_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiImsize_ from 'markdown-it-imsize';
export const mdiImsize = (mdiImsize_ as any).default || mdiImsize_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiAnchor_ from 'markdown-it-anchor';
export const mdiAnchor = (mdiAnchor_ as any).default || mdiAnchor_;

// @ts-ignore TS7016 Could not find a declaration file
import * as mdiToc_ from 'markdown-it-table-of-contents';
export const mdiToc = (mdiToc_ as any).default || mdiToc_;



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
    const md = markdownit({
        html: true,
        highlight(str: string, lang: string) {
            if (lang && highlightJs.getLanguage(lang)) {
                try {
                    return highlightJs.highlight(lang, str).value;
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
        .use(mdiPlantUml, {
            // TODO: To prevent following error in nodejs, use http if running on nodejs.
            //       "Error: unable to verify the first certificate in nodejs"
            //       You can also set env NODE_TLS_REJECT_UNAUTHORIZED=0 to prevent it.
            server: `http${isNode ? '' : 's'}://www.plantuml.com/plantuml`
        })
        .use(mdiMath)
        .use(mdiImsize)
        .use(mdiAnchor)
        .use(mdiToc, {
            includeLevel: options.tocIncludeLevel || [1, 2],
        });
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
        return raw(this.props.children);
    }

    public render(contexts: Map<string, any>, children: string) {
        const md: markdownit.MarkdownIt =
            this.getContext(contexts, CONTEXT_MARKDOWN_ROOT) ||
            getMarkdownIt({});

        if (this.props.inline) {
            return md.renderInline(children);
        } else {
            return md.render(children);
        }
    }
}
