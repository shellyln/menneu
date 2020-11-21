// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export function readFromStdin() {
    return new Promise<string>((resolve, reject) => {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        let inputData = '';

        process.stdin.on('data', (chunk) => {
            inputData += chunk;
        });

        process.stdin.on('end', () => {
            resolve(inputData);
        });
    });
}


export function writeToStdout(data: Buffer | string) {
    return new Promise<void>((resolve, reject) => {
        const done = process.stdout.write(data);
        if (done) {
            resolve();
        } else {
            process.stdout.once('drain', () => {
                resolve();
            });
        }
    });
}
