// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



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
