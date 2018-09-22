
module.exports = {
    title: 'Billing statement example',
    // bodyStyle: '',
    // markdownBodyStyle: '',

    // rawInput: true,

    // inputFormat: 'md',    // md | html | lsx
    // dataFormat: 'json',   // json | lisp
    // outputFormat: 'pdf',  // pdf | html | png | jpeg

    // navigateOptions: {},  //
    // imageOptions: {},     //
    pdfOptions: {
        width: '210mm',
        height: '297mm',
        printBackground: true,
        landscape: false,
        preferCSSPageSize: false,
        displayHeaderFooter: true,
        headerTemplate: ``,
        footerTemplate: ``,
    },

    globals: {
        "$to-locale-string": (...args) => args.slice(-1)[0].toLocaleString(...(args.slice(0, -1))),
    },

    // noDefaultComponents: true,
    // components: {
    // },

    // noDefaultMarkdownPlugins: true,
    // markdownPlugins: [{ plugin: require('markdown-it-'), options: [] }],

    // markdownCustomContainers: [],
};
