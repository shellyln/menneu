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

OPTIONS:
  -h, --help
      Show this help.
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
   -o, --out
      Path to output file.
      If this option is not present, it is output to STDOUT.
   --watch
      Watch changes of the parent directory of InputFilePath forever.
      If changes are detected, update the output.
`;
    throw new InvalidCliOptionsError(message);
}
