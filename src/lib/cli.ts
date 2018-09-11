// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { dirname,
         join,
         resolve }                from 'path';
import { existsSync,
         readFile,
         writeFile,
         watch }                  from 'fs';
import { promisify }              from 'util';
import { requireDynamic }         from './dynamic';
import { CliConfig,
         RenderOptions,
         InvalidCliOptionsError } from './types';
import { readFromStdin,
         writeToStdout }          from './io';
import { render }                 from './render';
import { showHelp }               from './help';



export function makeCliConfig(argv: string[], helpFn: () => void) {
    const config: CliConfig = {
        useStdin: true,
        inputFormat: 'md',
        configFormat: 'json',
        dataFormat: 'json',
        useStdout: true,
        outputFormat: 'pdf',
    };

    const getInputFormat = (path: string) => {
        const t = path.toLowerCase();
        if (t.endsWith('.lsx') || t.endsWith('.lisp')) {
            return 'lsx';
        } else if (t.endsWith('.md') || t.endsWith('.markdown')) {
            return 'md';
        } else if (t.endsWith('.html') || t.endsWith('.htm')) {
            return 'html';
        }
        return null;
    };

    const getDataFormat = (path: string) => {
        const t = path.toLowerCase();
        if (t.endsWith('.lisp')) {
            return 'lisp';
        } else if (t.endsWith('.json')) {
            return 'json';
        }
        return null;
    };

    const inputPath = argv[2];
    if (inputPath === '-h' || inputPath === '--help') {
        helpFn();
    } else if (inputPath === '-') {
        // read from stdin
        config.useStdin = true;
    } else {
        // read path/to/input/file
        if (!existsSync(inputPath)) {
            helpFn();
        }
        config.useStdin = false;
        config.inputPath = inputPath;
        config.inputFormat = getInputFormat(config.inputPath) || config.inputFormat;
    }

    const args = argv.slice(3);
    let dp = false, df = false;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '-i' || arg === '--in') {
            // next is path/to/input/file
            if (args.length <= (i + 1)) {
                helpFn();
            }
            if (!existsSync(args[i + 1])) {
                helpFn();
            }

            if (config.useStdin) {
                config.dataUseStdin = config.useStdin;
                config.dataPath = void 0;
                config.useStdin = false;
            } else if (! dp) {
                config.dataPath = config.inputPath;
            }
            if (! df) {
                config.dataFormat = getDataFormat(config.dataPath || '') || config.dataFormat;
            }

            config.inputPath = args[++i];
            config.inputFormat = getInputFormat(config.inputPath) || config.inputFormat;
        } else if (arg === '-if' || arg === '--in-format') {
            // next is output format (lsx|md|markdown|html)
            switch (args[i + 1]) {
            case 'lsx': case 'lisp':
            case 'md': case 'markdown':
            case 'html': case 'htm':
                config.inputFormat = args[++i] as any;
                break;
            default:
                helpFn();
            }
        } else if (arg === '--raw') {
            config.rawInput = true;
        } else if (arg === '-df' || arg === '--data-format') {
            df = true;
            // next is data format (lisp|json)
            switch (args[i + 1]) {
            case 'lisp': case 'json':
                config.dataFormat = args[++i] as any;
                break;
            default:
                helpFn();
            }
        } else if (arg === '-d' || arg === '--data') {
            dp = true;
            // next is path/to/data/file
            if (args.length <= (i + 1)) {
                helpFn();
            }
            if (!existsSync(args[i + 1])) {
                helpFn();
            }

            config.dataPath = args[++i];
            config.dataFormat = getDataFormat(config.dataPath || '') || config.dataFormat;
        } else if (arg === '-c' || arg === '--config') {
            // next is path/to/config/file
            if (args.length <= (i + 1)) {
                helpFn();
            }
            if (!existsSync(args[i + 1])) {
                helpFn();
            }

            config.configPath = args[++i];
            const t = config.configPath.toLowerCase();

            if (t.endsWith('.js')) {
                config.configFormat = 'js';
            } else if (t.endsWith('.json')) {
                config.configFormat = 'json';
            }
        } else if (arg === '-of' || arg === '--out-format') {
            // next is output format (html|pdf|png|jpeg)
            switch (args[i + 1]) {
            case 'html': case 'pdf': case 'png': case 'jpeg':
                config.outputFormat = args[++i] as any;
                break;
            default:
                helpFn();
            }
        } else if (arg === '-o' || arg === '--out') {
            // next is path/to/output/file
            if (args.length <= (i + 1)) {
                helpFn();
            }

            config.useStdout = false;
            config.outputPath = args[++i];
            const t = config.outputPath.toLowerCase();

            if (t.endsWith('.html')) {
                config.outputFormat = 'html';
            } else if (t.endsWith('.pdf')) {
                config.outputFormat = 'pdf';
            } else if (t.endsWith('.png')) {
                config.outputFormat = 'png';
            } else if (t.endsWith('.jpeg')) {
                config.outputFormat = 'jpeg';
            }
        } else if (arg === '--watch') {
            if (! config.useStdin) {
                config.watch = true;
            }
        }
    }

    if (! config.configPath) {
        if (config.inputPath) {
            const p = dirname(resolve(config.inputPath));
            const name = join(p, 'menneu.config');
            if (existsSync(name + '.js')) {
                config.configFormat = 'js';
                config.configPath = name + '.js';
            } else if (existsSync(name + '.json')) {
                config.configFormat = 'json';
                config.configPath = name + '.json';
            }
        }
    }
    if (! config.configPath) {
        const p = dirname(process.cwd());
        const name = join(p, 'menneu.config');
        if (existsSync(name + '.js')) {
            config.configFormat = 'js';
            config.configPath = name + '.js';
        } else if (existsSync(name + '.json')) {
            config.configFormat = 'json';
            config.configPath = name + '.json';
        }
    }

    return config;
}


export function readInput(config: CliConfig) {
    if (config.useStdin) {
        return readFromStdin();
    } else if (config.inputPath) {
        return promisify(readFile)(config.inputPath as string, { encoding: 'utf8' });
    }
    return Promise.resolve('');
}


export async function readConfig(config: CliConfig): Promise<RenderOptions> {
    let conf = config;
    if (config.configPath) {
        switch (config.configFormat) {
        case 'json':
            {
                const s = await promisify(readFile)(config.configPath, { encoding: 'utf8' });
                conf = JSON.parse(s);
            }
            break;
        case 'js':
            conf = requireDynamic(resolve(config.configPath));
            break;
        }
        conf = Object.assign({}, config, conf);
    }
    return conf;
}


export function readData(config: CliConfig) {
    if (config.dataUseStdin) {
        return readFromStdin();
    } else if (config.dataPath) {
        return promisify(readFile)(config.dataPath, { encoding: 'utf8' });
    }
    return Promise.resolve('');
}


export async function processDocument(config: CliConfig) {
    const src = await readInput(config);
    const conf = await readConfig(config);
    const data = await readData(config);

    const buf = await render(src, data, conf);

    if (config.useStdout) {
        await writeToStdout(buf);
    } else if (config.outputPath) {
        await promisify(writeFile)(config.outputPath as string, buf);
    }

    return buf;
}


export async function run() {
    let config: CliConfig = null as any;

    try {
        config = makeCliConfig(process.argv, showHelp);
    } catch (e) {
        if (e instanceof InvalidCliOptionsError) {
            console.error(e.message);
        } else {
            console.error(e);
        }
        process.exit(-1);
    }

    if (config.watch && config.inputPath) {
        let timer: any = null;
        const p = dirname(resolve(config.inputPath));
        watch(p, (event, filename) => {
            if (! timer) {
                timer = setTimeout(() => {
                    console.error(`Reloading ${filename} ...`);
                    (async () => {
                        try {
                            await processDocument(config);
                            console.error('Done!');
                        } catch (e) {
                            console.error(e);
                        }
                        timer = null;
                    })();
                }, 500);
            }
        });
        try {
            console.error('Start watching...');
            await processDocument(config);
            console.error('Done!');
        } catch (e) {
            console.error(e);
        }
    } else {
        try {
            await processDocument(config);
            process.exit(0);
        } catch (e) {
            console.error(e);
            process.exit(-1);
        }
    }
}
