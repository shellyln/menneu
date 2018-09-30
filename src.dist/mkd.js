const start = (async (cf) => {
    const buf = await menneu.render(Array.from(document.querySelectorAll('script[type="text/markdown"]'), x => x.innerHTML).join(' '), {}, Object.assign({
        rawInput: true,
        inputFormat: 'md',
        outputFormat: 'html',
        title: 'Markdown',
        markdownBodyStyle: 'font-family: "Yu Gothic Medium", YuGothic, meiryo, "Microsoft JhengHei", "Microsoft YaHei", "SimHei", helvetica, arial, sans-serif;',
    }, cf || {}));
    document.write(buf.toString());
    document.close();
});