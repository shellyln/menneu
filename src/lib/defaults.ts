// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export const navigateOptionsDefault = {};

export const imageOptionsDefault = {
    type: 'png',
    fullPage: true,
    omitBackground: false,
};

export const pdfOptionsDefault = {
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
            <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>`,
};
