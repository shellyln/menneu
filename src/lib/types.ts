// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export interface MarkdownOptions {
    bodyStyle?: string;
    markdownBodyStyle?: string;

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

    plantUmlServerUrl?: string;
    tocIncludeLevel?: number[];

    replacementMacros?: Array<{
        re: RegExp,
        fn: 'lsx' | ((matchedSubstr: string, ...pN: string[]) => string),
        async?: boolean,
    }>;
}


export interface FormatOptions {
    rawInput?: boolean;
    inputFormat: 'markdown' | 'md' | 'markdown-fragment' | 'md-fragment' | 'html' | 'htm' | 'lsx' | 'lisp';
    dataFormat: 'lisp' | 'json' | 'object';
    outputFormat: 'html' | 'pdf' | 'png' | 'jpeg';
}


export interface TempOptions {
    useDataUrl?: boolean;
    tempDir?: string;
}


export interface RenderOptions extends MarkdownOptions, FormatOptions, TempOptions {
    title?: string;

    launchOptions?: any;

    navigateOptions?: any;
    imageOptions?: any;
    pdfOptions?: any;

    globals?: object;

    noDefaultComponents?: boolean;
    components?: object;
}


export interface CliConfig extends FormatOptions, TempOptions {
    useStdin: boolean;
    inputPath?: string;

    configPath?: string;
    configFormat: 'js' | 'json' | 'object';

    dataUseStdin?: boolean;
    dataPath?: string;

    useStdout: boolean;
    outputPath?: string;

    watch?: boolean;
}


export class InvalidCliOptionsError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
