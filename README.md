# Ménneu
## Component-based extensible document processor

✒️Render the { markdown | lsx | html } document templates into a ✨beautiful✨ { pdf | html | image }📄 formats.

[![Ménneu](https://shellyln.github.io/assets/image/ménneu-logo.svg)](https://github.com/shellyln/menneu/)



[![npm](https://img.shields.io/npm/v/menneu.svg)](https://www.npmjs.com/package/menneu)
[![GitHub release](https://img.shields.io/github/release/shellyln/menneu.svg)](https://github.com/shellyln/menneu/releases)
[![Travis](https://img.shields.io/travis/shellyln/menneu/master.svg)](https://travis-ci.org/shellyln/menneu)
[![GitHub forks](https://img.shields.io/github/forks/shellyln/menneu.svg?style=social&label=Fork)](https://github.com/shellyln/menneu/fork)
[![GitHub stars](https://img.shields.io/github/stars/shellyln/menneu.svg?style=social&label=Star)](https://github.com/shellyln/menneu)


You can easily build the complex documents written in [Markdown](https://github.com/markdown-it/markdown-it), HTML and [LSX](https://github.com/shellyln/liyad#what-is-lsx)
that including images, [charts](https://www.chartjs.org/), [UML diagrams](http://plantuml.com/), [barcodes and 2d codes (QR Code)](https://github.com/shellyln/red-agate/tree/master/packages/red-agate-barcode).  
And get the output as a PDF, PNG and JPEG rendered by [Puppeteer](https://github.com/GoogleChrome/puppeteer), or the HTML that packed into the single file.

Furthermore, you can insert the data from the file into the document with the control statements.

----
## Examples

<table align="center">
  <tbody>
    <tr align="center">
      <td style="width:33%">
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-markdown.pdf">
          <img src="https://shellyln.github.io/menneu/assets/pdf/example-markdown.png" style="max-width:100%;">
        </a>
        Markdown Demo
        <a href="https://github.com/shellyln/menneu/tree/master/examples/markdown-demo">
          source
        </a>
        /
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-markdown.pdf">
          pdf
        </a>
      </td>
      <td width="33%">
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-bill.pdf">
          <img src="https://shellyln.github.io/menneu/assets/pdf/example-bill.png" style="max-width:100%;">
        </a>
        Billing Statement
        <a href="https://github.com/shellyln/menneu/tree/master/examples/billing">
          source
        </a>
        /
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-bill.pdf">
          pdf
        </a>
      </td>
      <td width="33%">
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-html.pdf">
          <img src="https://shellyln.github.io/menneu/assets/pdf/example-html.png" style="max-width:100%;">
        </a>
        HTML Demo
        <a href="https://github.com/shellyln/menneu/tree/master/examples/html-demo">
          source
        </a>
        /
        <a href="https://shellyln.github.io/menneu/assets/pdf/example-html.pdf">
          pdf
        </a>
      </td>
    </tr>
    <tr>
      <td style="text-align:center">
        Testing the basic and extended markdown syntaxes.
      </td>
      <td style="text-align:center">
        Reporting example that markuped up with Lisp LSX syntax.
      </td>
      <td style="text-align:center">
        Testing the html template that embedding Lisp LSX.
      </td>
    </tr>
  </tbody>
</table>

----

## Getting started

### Use CLI:

install via NPM:
```bash
$ npm install -g menneu
```

and run Ménneu:
```bash
$ menneu README.md --raw -o README.pdf
```

### Add shortcuts to Windows file explorer right-click 'Send to' menu
##### Prerequirements
```bash
$ npm install -g menneu
```
##### Install
Download the source archive from [https://github.com/shellyln/menneu/archive/master.zip](https://github.com/shellyln/menneu/archive/master.zip) and extract it.

```cmd
> cd menneu\shell-ext\windows
> make-sendto-shortcuts.cmd
```

### Use APIs:

install via NPM:
```bash
$ npm install menneu --save
```

and import Ménneu in your code:
```ts
import { render } from 'menneu';

(async () => {
    const buf = await render('# Hello!', {}, {
        inputFormat: 'md',
        dataFormat: 'object',
        outputFormat: 'pdf',
    });
})();
```
> NOTE: To build it, you should use `webpack` + `raw-loader` (or other packagers and/or plugins) to load CSS as string.

### Use APIs on the browsers:

Install via NPM, or download UMD from [release](https://github.com/shellyln/menneu/releases) page.

----

## Playground

https://shellyln.github.io/menneu/playground.html


## Express starter with the browser

[Ménneu Markdown Notebook](https://github.com/shellyln/menneu-md-notebook)  
Edit markdown locally w/o installing any apps.


----


## CLI
```
menneu -h
menneu --help

menneu InputFilePath [OPTIONS]
menneu - [OPTIONS]
```

* `InputFilePath`
    * Path to input document template file.
    * If `-` is set, read from `STDIN`.
    * If `-i` or `--in` is set in the *OPTIONS*, *InputFilePath* points a path of data file.

#### Options
* `-h`, `--help`
    * Show this help.
* `-i` *InFilePath*, `--in` *InFilePath*
    * *InFilePath*: Path to input document template file.
* `-if` *InFormatName*, `--in-format` *InFormatName*
    * *InFormatName* : `lsx` | `lisp` | `md` | `markdown` | `html` | `htm`
    * Input document template file format.
    * This format is set automatically from template file's extension.
        * If it is not set, Defailt is `md`.
* `--raw`
    * Disable Lisp block expansion.
        * This option can be set for `md` | `markdown` | `html` | `htm` .
* `-c` *ConfigJsonOrJsPath*, `--config` *ConfigJsonOrJsPath*
    * *ConfigJsonOrJsPath* : Path to `menneu.config.js` | `menneu.config.json` .
    * Default is `menneu.config.js` | `menneu.config.json` that is in the same directory to input file.
        * If no `menneu.config.js` | `menneu.config.json` files is in the same directory to input file,
          use `menneu.config.js` | `menneu.config.json` in the current working directory.
* `-df` *DataDormatName*, `--data-format` *DataDormatName*
    * *DataDormatName* : `json` | `lisp`
    * The file format of the data applied to the document template.
    * This format is set automatically from data file's extension.
        * If it is not set, defailt is `json`.
* `-d` *DataPath*
    * *DataPath* : Path to data file.
* `-of` *OutFormatName*, `--out-format` *OutFormatName*
    * *OutFormatName* : `html` | `pdf` | `png` | `jpeg`
    * Output file format.
    * This format is set automatically from output file's extension.
        * If it is not set, defailt is `pdf`.
* `-o` *OutPath*, `--out` *OutPath*
    * *OutPath*: Path to output file.
    * If this option is not present, it is output to `STDOUT`.
* `-t` *TempDir*, `--tmpdir` *TempDir*
    * *TempDir*: Path to temporary directory that to generate the temporary html file passing to the Puppeteer.
* `-ti`, `--tmp-indir`
    * Set *TempDir* to the parent directory of the input document file.
        * It is default option.
* `-tc`, `--tmp-cwd`
    * Set *TempDir* to the current working directory.
* `-to`, `--tmp-os`
    * Set *TempDir* to the system temporary directory.
* `-tm`, `--tmp-mem`
    * No temporary directory is used. Pass a data URL to the Puppeteer.
* `--watch`
    * Watch changes of the parent directory of `InputFilePath` forever.
    * If changes are detected, update the output.


----


## Config file
`.js` or `.json` are available.

```js
const escapeHtml = (s) => s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

module.exports = {
    title: 'example',               // Document title of markdown.

    // bodyStyle: '',               // <body> style of markdown.
    markdownBodyStyle:              // "markdownBody" <div> style of markdown.
        'font-family: "Yu Gothic Medium", "Microsoft JhengHei", arial, sans-serif;',

    // rawInput: true,              // Disable Lisp block expansion.

    // inputFormat: 'md',           // Input document template file format. (md | html | lsx)
    // dataFormat: 'json',          // The file format of the data applied to the document template. (json | lisp)
    // outputFormat: 'pdf',         // Output file format. (pdf | html | png | jpeg)

    // launchOptions:               // Puppeteer's option. See "puppeteer.launch(options)".
    //     { headless: false },     //   https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#puppeteerlaunchoptions
    // navigateOptions: {},         // Puppeteer's option. See "page.goto(url, options)".
                                    //   https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options
    // imageOptions: {},            // Puppeteer's option. See "page.screenshot([options])".
                                    //   https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions
    pdfOptions: {                   // Puppeteer's option. See "page.pdf(options)".
                                    //   https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
        width: '210mm',
        height: '297mm',
        printBackground: true,
        landscape: false,
        preferCSSPageSize: false,
        displayHeaderFooter: true,
        headerTemplate: `
            <div style="margin: 0mm auto -10mm; text-align: center; font-size: 9pt;">
                <span class="title"></span>
            </div>`,
        footerTemplate: `
            <div style="margin: 10mm auto 0mm; text-align: center; font-size: 9pt;">
                <span class="pageNumber"></span> of <span class="totalPages"></span>
            </div>`,
    },

    globals: {                      // Lisp global variables.
        "$now": () => (new Date).toLocaleDateString('en-US'),
        "$to-locale-string": (...args) => args.slice(-1)[0].toLocaleString(...(args.slice(0, -1))),
        "$dir": (...args) => console.dir(...args),
        "qwerty": "asdfgh",
    },

    // noDefaultComponents: true,   // Disable default components.
    components: {                   // Additional RedAgate components.
                                    // See also https://github.com/shellyln/red-agate/tree/master/packages/red-agate
        Greeting: (props) => `Hello, ${props.to}! ${props.children}`,
    },

    // noDefaultMarkdownPlugins:    // Disable default markdown-it plugins.
    //     true,
    // markdownPlugins:             // Additional markdown-it plugins.
    //     [{ plugin: require('markdown-it-'), options: [] }],

    markdownCustomContainers: [{    // See https://github.com/markdown-it/markdown-it-container
        name: 'content',
    }, {
        name: 'spoiler',
        validate: (params) => {
            return params.trim().match(/^spoiler\s+(.*)$/);
        },
        render: (tokens, idx) => {
            const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<details><summary>' + escapeHtml(m[1]) + '</summary>\n';
            } else {
                // closing tag
                return '</details>\n';
            }
        },
    }],
};
```

You can also export configuration by using the function.
```js
module.exports = (env) => {
    // env is following object:
    // {
    //     styles: {
    //         normalizeCss:       string,
    //         markdownCss:        string,
    //         highlightCss:       string,
    //         paperCss:           string,
    //     },
    //     moment:                 object,
    //     Liyad:                  object,
    //     RedAgateUtil:           object,
    //     RedAgateSvgCanvas:      object,
    //     RedAgateMath:           object,
    //     RedAgate:               object,
    //     React:                  object,
    //     ReactDom:               object,
    //     components:             object,
    //     highlightJs:            object,
    //     markdownit:             object,
    //     markdownitPlugins: {
    //         markdownitContaier: object,
    //         markdownitEmoji:    object,
    //         markdownitSub:      object,
    //         markdownitSup:      object,
    //         markdownitCheckbox: object,
    //         markdownitPlantuml: object,
    //         markdownitMath:     object,
    //         markdownitImsize:   object,
    //     },
    //     getMarkdownIt:          function,
    //     getMarkdownRoot:        function,
    // }

    // The function should return the configuration object.
    return {
        ...
    };
};
```

----


## Features

### Render markdown into HTML and PDF.

Markdown is parsed into HTML by [markdown-it](https://github.com/markdown-it/markdown-it)
and converting from HTML into PDF by [puppeteer](https://github.com/GoogleChrome/puppeteer) .

Following markdown-it plugins are available by default:
* [markdown-it-checkbox](https://github.com/mcecot/markdown-it-checkbox)
* [markdown-it-container](https://github.com/markdown-it/markdown-it-container)
* [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)
* [markdown-it-imsize](https://github.com/tatsy/markdown-it-imsize)
* [markdown-it-math](https://github.com/runarberg/markdown-it-math)
* [markdown-it-plantuml](https://github.com/gmunguia/markdown-it-plantuml)
* [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub)
* [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup)

You can append other plugins by configureing the `menneu.config.js` .

HTML source files are also available.

### Render LSX template into HTML and PDF.

See [Liyad](https://github.com/shellyln/liyad) for more informations about Lisp and [LSX](https://github.com/shellyln/liyad#what-is-lsx) syntax and operators.


### Lisp block expansion

In the markdown or HTML documents, you can start `Lisp` block.
The block starts with `%%%(` and ends with pair parenthesis `)` .
* You should escape following characters in the document:
    * `\` -> `\\`
    * `"""` -> `\"\"\"`
    * `%%%` -> `\%\%\%`


#### Conditional branch
```markdown
%%%($last                           ;; "$last" is a function that evaluate parameters, and returns last parameter.
    ($set ($data isMorning) false)
    ($set ($data name) "World")
    nil                             ;; "nil" is zero length array. it will replace to zero length string by document processor.
)

%%%($=if ($get $data isMorning)
"""Markdown
## Good morning, %%%($get $data name)!
""")

%%%($=if ($not ($get $data isMorning))
"""Markdown
## Hello, %%%($get $data name)!
""")
```
is equivalent to

```markdown
## Hello, World!
```


#### Repeating
```markdown
# Greeting

%%%($=for ($list "World" "Jane" "Joe")
"""Markdown
## Hello, %%%($get $data)!
""")

Good morning!
```

is equivalent to

```markdown
# Greeting

## Hello, World!
## Hello, Jane!
## Hello, Joe!

Good morning!
```


#### Variables

* The data file is parsed and set to `$data` variable.

Data file:
```json
{
    "foo": 1,
    "bar": "World"
}
```

Document template:
```markdown
## Hello, %%%($get $data bar)!
```

Result:
```html
<h2>Hello, World!</h2>
```

* To define the variable, use `$let` function in the Lisp block.

Document template:
```markdown
%%%($let a "A")
%%%($get a)
```

Result:
```html
<p>A</p>
```

* To set the value to the variable, use `$set` function in the Lisp block.

Document template:
```markdown
%%%($let a "A")
%%%($set a "B")
%%%($get a)
```

Result:
```html
<p>B</p>
```

* To set the value to the object property or array index, you can also use `$set` function.

Document template:
```markdown
%%%($let a (#    ;; "#" is object literal function.
    (foo 1)
    (bar ($list "World" "Jane" "Joe")) ))

%%%($set (a bar 1) "John")
%%%($get a bar 1)
```

Result:
```html
<p>John</p>
```

#### Functions

Document template:
```markdown
%%%($last
    ($defun fac (n)
        ($if (== n 0)
            1
            (* n ($self (- n 1))) ) )
    nil)

Factorial of 3 is %%%(fac 3).
```

Result:
```html
<p>Factorial of 3 is 6.</p>
```


#### LSX DOM elements
You can markup standard HTML and SVG tags witten in [LSX](https://github.com/shellyln/liyad#what-is-lsx) notation.

Document template:
```markdown
%%%(style (@ (dangerouslySetInnerHTML ".content { font-style: italic; color: red; }")))
```

Result:
```html
<style>.content { font-style: italic; color: red; }</style>
```


#### Components
You also can markup with [RedAgate](https://github.com/shellyln/red-agate) tag-lib components.

Document template:
```markdown
%%%(Greeting (@ (to "Menneu")) "Good morning!")
%%%(Svg (@ (width  100)
           (height 100)
           (unit "mm") )
    (Canvas (-> (ctx) (::ctx@moveTo  10  10)
                      (::ctx@lineTo 190 190)
                      (::ctx:strokeStyle="rgba(255,128,0,0.2)")
                      (::ctx@stroke)
                      (::ctx@beginPath) ))
    (Rect   (@  (x 5)
                (y 67)
                (width  70)
                (height 11)
                (strokeColor "blue")
                (stroke) ))
    (Qr     (@  (x 5)
                (y 7)
                (cellSize 0.8)
                (data "Hello") ))
    (Code128(@  (x 35)
                (y  7)
                (elementWidth 0.66)
                (height 15)
                (quietHeight 0)
                (textHeight 7)
                (font "7px 'OCRB'")
                (data "Hello") ))
    (Gtin13 (@  (x 10)
                (y 37)
                (elementWidth 0.66)
                (height 15)
                (quietHeight 0)
                (textHeight 7)
                (font "7px 'OCRB'")
                (data "123456789012") )) )
```

`menneu.config.js`:
```js
module.exports = {
    ...
    components: {
        Greeting: (props) => `Hello, ${props.to}! ${props.children}`,
    },
    ...
};
```

Result:
```html
<p>Hello, Menneu! Good morning!</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100mm" height="100mm" viewBox="0 0 100 100">
...
</svg>
```

Following components are available by default:
* Utilities
    * [Do](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/taglib.ts)
    * [Facet](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/taglib.ts)
* Resource bundlers
    * [Asset](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
    * [Image](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
    * [Script](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
    * [Style](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
    * [Font](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
    * [SingleFont](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/bundler.ts)
* HTML and XML
    * [Html4_01_Strict](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Html4_01_Transitional](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Html4_01_Frameset](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Xhtml1_0_Strict](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Xhtml1_0_Transitional](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Xhtml1_0_Frameset](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Html5](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [Xml](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
    * [HtmlImposition](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/html.tsx)
* SVG and Canvas
    * [Svg](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Ambient](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Arc](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Canvas](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Circle](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Curve](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [GridLine](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Group](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Line](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Path](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Pie](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Polygon](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Rect](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [RoundRect](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [SvgAssetFragment](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [SvgFragment](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [Text](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
    * [SvgImposition](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/svg.tsx)
* Printer marks
    * [PrinterMarks](https://github.com/shellyln/red-agate/blob/master/packages/red-agate/src/red-agate/printing.ts)
* Barcodes and 2D codes
    * [Code128](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Code128.ts)
    * [Code39](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Code39.ts)
    * [Ean13](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts) / Gtin13
    * [Ean8](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts) / Gtin8
    * [Ean5](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts)
    * [Ean2](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts)
    * [UpcA](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts)
    * [UpcE](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Ean.ts)
    * [Itf](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Itf.ts)
    * [JapanPostal](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/JapanPostal.ts)
    * [Nw7](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Nw7.ts)
    * [Qr](https://github.com/shellyln/red-agate/blob/master/packages/red-agate-barcode/src/barcode/Qr.ts)
* Markdown
    * [MarkdownRoot](https://github.com/shellyln/menneu/blob/master/src/components/Markdown.ts)
    * [Markdown](https://github.com/shellyln/menneu/blob/master/src/components/Markdown.ts)
        * This is using the [markdown-it](https://github.com/markdown-it/markdown-it).
* HTML fragments
    * [RawHtml](https://github.com/shellyln/menneu/blob/master/src/components/RawHtml.ts)
* Math ML
    * [Math](https://github.com/shellyln/menneu/blob/master/src/components/Math.tsx)
        * This is using the [markdown-it-math](https://www.npmjs.com/package/markdown-it-math).
    * [Mml](https://github.com/shellyln/menneu/blob/master/src/components/Math.tsx)
* Charts and UML graphs
    * [Chart](https://github.com/shellyln/menneu/blob/master/src/components/Chart.tsx)
        * This is using the [Chart.js](https://github.com/chartjs/Chart.js) and [chartjs-plugin-datalabels](https://github.com/chartjs/chartjs-plugin-datalabels).
    * [PlantUml](https://github.com/shellyln/menneu/blob/master/src/components/PlantUml.tsx)
        * This is using the [markdown-it-plantuml](https://www.npmjs.com/package/markdown-it-plantuml).
    * [PlantUmlLite](https://github.com/shellyln/menneu/blob/master/src/components/PlantUml.tsx)
* Style sheets
    * [NormalizeCss](https://github.com/shellyln/menneu/blob/master/src/components/styles.tsx)
        * Include a [Normalize.css](https://necolas.github.io/normalize.css/) stylesheet into the document.
    * [MarkdownCss](https://github.com/shellyln/menneu/blob/master/src/components/styles.tsx)
        * Include a [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) stylesheet into the document.
    * [HighlightCss](https://github.com/shellyln/menneu/blob/master/src/components/styles.tsx)
        * Include a [highlight.js](https://highlightjs.org/) stylesheet into the document.
    * [PaperCss](https://github.com/shellyln/menneu/blob/master/src/components/styles.tsx)
        * Include a [paper-css](https://github.com/cognitom/paper-css) stylesheet into the document.


----


## APIs

### render()
```ts
export async function render(source: string, data: any, options: RenderOptions): Promise<Buffer>;
```
Render the document from document template.

* returns : Buffer of output document.
* `source` : Document template.
* `data` : Data (json string | lisp string | object)
* `options` : Render options.


### processDocument()
```ts
export async function processDocument(config: CliConfig): Promise<Buffer>;
```
Read input file or STDIN, read config file, render and output document into file or STDOUT.

* returns : Buffer of output document.
* `config` : Configurations that specified by command line options.

### run()
```ts
export async function run();
```
Main of CLI app.  
Parse command line options and call processDocument().

### parameters types :
```ts
export interface MarkdownOptions {
    noDefaultMarkdownPlugins?: boolean;
    markdownPlugins?: Array<{
        plugin: any,
        options: any[],
    }>;

    markdownCustomContainers?: Array<{
        name: string,
        validate?: (params: string) => boolean,
        render?: (tokens: any[], index: number) => string,
        marker?: string,
    }>;
}

export interface FormatOptions {
    rawInput?: boolean;
    inputFormat: 'markdown' | 'md' | 'html' | 'htm' | 'lsx' | 'lisp';
    dataFormat: 'lisp' | 'json' | 'object';
    outputFormat: 'html' | 'pdf' | 'png' | 'jpeg';
}

export interface RenderOptions extends MarkdownOptions, FormatOptions {
    title?: string;

    navigateOptions?: any;
    imageOptions?: any;
    pdfOptions?: any;

    globals?: object;

    noDefaultComponents?: boolean;
    components?: object;
}

export interface CliConfig extends FormatOptions {
    useStdin: boolean;
    inputPath?: string;

    configPath?: string;
    configFormat: 'js' | 'json' | 'object';

    dataPath?: string;

    useStdout: boolean;
    outputPath?: string;

    watch?: boolean;
}
```


----


## License
[ISC](https://github.com/shellyln/menneu/blob/master/LICENSE.md)  
Copyright (c) 2018, Shellyl_N and Authors.
