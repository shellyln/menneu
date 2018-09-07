// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export const markdownHeader = (title?: string) =>
`(Html5 (head
    ${(title !== void 0 && title !== '') ? `(title "${title.replace(/"/g, '\\"')}")` : ''}
    (meta (@ (charset "UTF-8")))
    (NormalizeCss)
    (MarkdownCss)
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
) (body (div (@ (class "markdown-body")) (MarkdownRoot
"""Markdown
`;

export const markdownFooter = () => `
""" ))))`;
