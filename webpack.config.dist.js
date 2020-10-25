const webpack = require('webpack');
const path = require('path');


const babelOptions = {
    loader: 'babel-loader',
    options: {
        'sourceMaps': true,
        'presets': [
            ['@babel/preset-env', {
                'targets': {
                    'chrome': 68
                }
            }]
        ],
        'ignore': [],
    }
};


module.exports = function (env) {
    return [{
        target: "web",
        entry: {
            menneu: [
                path.resolve(__dirname, 'src/index.ts')
            ]
        },
        node: {
            // fs: "empty",
            // console: false,
            // process: false,
            global: false,
            __filename: false,
            __dirname: false,
            // Buffer: true,
            // setImmediate: false,
        },
        output: {
            library: 'menneu',

            libraryTarget: 'umd',
            globalObject: 'this',
            filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            devtoolModuleFilenameTemplate: void 0
        },
        resolve: {
            alias: {
                'babel/polyfill': path.resolve(__dirname, 'src/empty'),
            },

            // TODO:
            // ERROR in ./node_modules/red-agate-react-host/modules/react-host.mjs 11:15-50
            //       Can't import the named export 'renderToStaticMarkup' from non EcmaScript module (only default export is available)
            // ERROR in ./node_modules/red-agate-util/modules/runtime/require-dynamic.mjs 7:56-74
            //       Can't import the namespace object from non EcmaScript module (only default export is available)
            // extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.cjs', '.js']
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
                umd: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
                umd: 'react-dom',
            },
            'react-dom/server': {
                root: 'ReactDOMServer',
                commonjs2: 'react-dom/server',
                commonjs: 'react-dom/server',
                amd: 'react-dom/server',
                umd: 'react-dom/server',
            },
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [
                    babelOptions,
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.dist.json'
                    }),
                ],
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate.*)).*$/
            }, {
                test: /\.jsx?$/,
                use: [
                    babelOptions,
                ],
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate.*)).*$/
            }, {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            }, {
                enforce: 'pre',
                test: /\.[tj]sx?$/,
                use: {
                    loader: 'source-map-loader',
                    options: {
                    }
                },
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate.*)).*$/
            }, {
                test: /\.css$/,
                use: [
                    'raw-loader'
                ]
            }]
        },
        externals: [
            'fs',   // Used in `markdown-it-imsize`
            'path', // Used in `markdown-it-imsize`
            'react',
            'react-dom',
        ],
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
        devtool: 'source-map'
    },

]}