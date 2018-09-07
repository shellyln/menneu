// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt       from 'red-agate/modules';
import { normalizeCss,
         markdownCss,
         highlightCss,
         paperCss }    from '../lib/styles';




export const NormalizeCss = (props: rdgt.ComponentProps) =>
    <style dangerouslySetInnerHTML={{__html: normalizeCss}}></style>;

export const MarkdownCss = (props: rdgt.ComponentProps) =>
    <style dangerouslySetInnerHTML={{__html: markdownCss}}></style>;

export const HighlightCss = (props: rdgt.ComponentProps) =>
    <style dangerouslySetInnerHTML={{__html: highlightCss}}></style>;

export const PaperCss = (props: rdgt.ComponentProps) =>
    <style dangerouslySetInnerHTML={{__html: paperCss}}></style>;
