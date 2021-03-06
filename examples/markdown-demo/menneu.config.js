

const escapeHtml = (s) => s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");


module.exports = (env) => {
    return {
        title: 'Markdown example',
        // bodyStyle: '',
        markdownBodyStyle: 'font-family: "Yu Gothic Medium", YuGothic, meiryo, "Microsoft JhengHei", "Microsoft YaHei", "SimHei", helvetica, arial, sans-serif;',

        // plantUmlServerUrl: 'https://shellyln.github.io',
        // tocIncludeLevel: [1, 2, 3],

        // rawInput: true,

        // inputFormat: 'md',    // md | html | lsx
        // dataFormat: 'json',   // json | lisp
        // outputFormat: 'pdf',  // pdf | html | png | jpeg

        // launchOptions: { headless: false },
        navigateOptions: { waitUntil: 'networkidle0' },  // To render math formula by MathJax, set 'waitUntil' to 'networkidle0'.
        // imageOptions: {},     //
        pdfOptions: {
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

        globals: {
            "$now-fmt": () => (new Date).toLocaleDateString('en-US'),
            "$to-locale-string": (...args) => args.slice(-1)[0].toLocaleString(...(args.slice(0, -1))),
            "$dir": (...args) => console.dir(...args),
            "qwerty": "asdfgh",
        },

        // noDefaultComponents: true,
        components: {
            Greeting: (props) => `Hello, ${props.to}! ${props.children}`,
        },

        // noDefaultMarkdownPlugins: true,
        // markdownPlugins: [{ plugin: require('markdown-it-'), options: [] }],

        markdownCustomContainers: [{
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

        replacementMacros: [{
            re: /\!\!\!([\s\S]+?)\!\!\!/g,
            fn: 'lsx',
        }, {
            re: /\$\$\$\{(.)([\s\S]+?)\}\$\$\$/g,
            fn: async (m, p0, p1) => `<span style="background-color: green;"><strong>${p0}</strong>${p1}</span>`,
            async: true,
        }, {
            re: /\$\{(.)([\s\S]+?)\}/g,
            fn: (m, p0, p1) => `<span style="background-color: pink;"><strong>${p0}</strong>${p1}</span>`,
        }],
    };
};
