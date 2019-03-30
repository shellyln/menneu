const webpack = require('webpack');
const path = require('path');



module.exports = function (env) {
    return [{
        target: "node",
        entry: {
            menneu: [
                path.resolve(__dirname, 'src/app.ts')
            ]
        },
        output: {
            library: 'menneu',

            libraryTarget: 'commonjs2',
            filename: '[name].js',
            path: path.resolve(__dirname, 'bin.cli'),
            devtoolModuleFilenameTemplate: '../[resource-path]',
            // devtoolModuleFilenameTemplate: void 0
        },
        resolve: {
            // TODO:
            // ERROR in ./node_modules/red-agate-react-host/modules/react-host.mjs 11:15-50
            //       Can't import the named export 'renderToStaticMarkup' from non EcmaScript module (only default export is available)
            // ERROR in ./node_modules/red-agate-util/modules/runtime/require-dynamic.mjs 7:56-74
            //       Can't import the namespace object from non EcmaScript module (only default export is available)
            // extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.cjs', '.js']
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.json'
                    }),
                ],
                exclude: /node_modules[\/\\](?!menneu).*$/
            }, {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules[\/\\](?!menneu).*$/
            }, {
                enforce: 'pre',
                test: /\.[tj]sx?$/,
                use: {
                    loader: 'source-map-loader',
                    options: {
                    }
                },
                exclude: /node_modules[\/\\](?!menneu).*$/
            }, {
                test: /\.css$/,
                use: [
                    'raw-loader'
                ]
            }]
        },
        plugins: [
            new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
        ],
        devtool: 'source-map'
    },

]}