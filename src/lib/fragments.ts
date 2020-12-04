// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { RenderOptions } from "./types";



export const markdownHeader = (options: RenderOptions) =>
`(Html5 (head
    ${(options.title !== void 0 && options.title !== '') ? `(title "${options.title.replace(/"/g, '\\"')}")` : ''}
    (meta (@ (charset "UTF-8")))
    (NormalizeCss)
    (${options.darkTheme ? 'MarkdownDarkCss' : 'MarkdownCss'})
    (HighlightCss)
    (style (@ (dangerouslySetInnerHTML "
        @page {
            margin: 12mm 12mm 16mm 12mm;
        }
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (max-width: 767px) {
            .markdown-body {
                padding: 15px;
            }
        }
    ") ))
) (body (@ (style "${
    options.bodyStyle ? options.bodyStyle.replace(/"/g, '\\"') : ''
}")) (div (@ (class "markdown-body") (style "${
    options.markdownBodyStyle ? options.markdownBodyStyle.replace(/"/g, '\\"') : ''
}")) (MarkdownRoot
"""Markdown
`;

export const markdownFooter = () => `
""" ))))`;
