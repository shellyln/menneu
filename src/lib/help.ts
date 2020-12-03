// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { InvalidCliOptionsError } from './types';



export function showHelp() {
    const message =
`Ménneu - Component-based extensible document processor.
           Render the markdown|lsx|html document template
          into a beautiful pdf|html|image.

Usage:
  menneu -h
  menneu --help
  menneu InputFilePath [OPTIONS]
  menneu - [OPTIONS]

InputFilePath:
  Path to input document template file.
  If - is set, read from STDIN.
  If -i or --in is set in the OPTIONS, InputFilePath points a path of data file.

OPTIONS:
  -h, --help
      Show this help.
  -i InFilePath, --in InFilePath
      InFilePath: Path to input document template file.
  -if InFormatName, --in-format InFormatName
      InFormatName : lsx | lisp | md | markdown | html | htm
      Input document template file format.
      This format is set automatically from template file's extension.
          If it is not set, Defailt is md.
  --raw
      Disable Lisp block expansion.
          This option can be set for md | markdown | html | htm .
  -c ConfigJsonOrJsPath, --config ConfigJsonOrJsPath
      ConfigJsonOrJsPath : Path to menneu.config.js | menneu.config.json .
      Default is menneu.config.js | menneu.config.json
     that is in the same directory to input file.
          If no menneu.config.js | menneu.config.json files is in the same
         directory to input file, use menneu.config.js | menneu.config.json
         in the current working directory.
  -df DataDormatName, --data-format DataDormatName
      DataDormatName : json | lisp
     The file format of the data applied to the document template.
     This format is set automatically from data file's extension.
          If it is not set, defailt is json.
  -d DataPath
      DataPath : Path to data file.
  -of OutFormatName, --out-format OutFormatName
      OutFormatName : html | pdf | png | jpeg
      Output file format.
      This format is set automatically from output file's extension.
          If it is not set, defailt is pdf.
  -o OutPath, --out OutPath
      OutPath: Path to output file.
      If this option is not present, it is output to STDOUT.
  -t TempDir, --tmpdir TempDir
      TempDir: Path to temporary directory that to generate the temporary html file passing to the Puppeteer.
  -ti, --tmp-indir
      Set TempDir to the parent directory of the input document file.
          It is default option.
  -tc, --tmp-cwd
      Set TempDir to the current working directory.
  -to, --tmp-os
      Set TempDir to the system temporary directory.
  -tm, --tmp-mem
      No temporary directory is used. Pass a data URL to the Puppeteer.
  --dark-theme
      Use dark theme to render markdown.
  --watch
      Watch changes of the parent directory of InputFilePath forever.
      If changes are detected, update the output.
`;
    throw new InvalidCliOptionsError(message);
}
