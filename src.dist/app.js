const escapeHtml = (s) => s
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#39;");

const start = (async (cf) => {
    const buf = await menneu.render(Array.from(document.querySelectorAll('script[type="text/markdown"]'), x => x.innerHTML).join(' '), [1, 2, 3, 4, 5, 6], Object.assign({
        inputFormat: 'md',
        dataFormat: 'object',
        outputFormat: 'html',

        title: 'Markdown example',
        markdownBodyStyle: 'font-family: "Yu Gothic Medium", YuGothic, meiryo, "Microsoft JhengHei", "Microsoft YaHei", "SimHei", helvetica, arial, sans-serif;',
        globals: {
            "$now": () => (new Date).toLocaleDateString('en-US'),
            "$to-locale-string": (...args) => args.slice(-1)[0].toLocaleString(...(args.slice(0, -1))),
            "$dir": (...args) => console.dir(...args),
            "qwerty": "asdfgh",
        },
        components: {
            Greeting: (props) => `Hello, ${props.to}! ${props.children}`,
        },
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
    }, cf || {}));
    document.write(buf.toString());
    document.close();
});