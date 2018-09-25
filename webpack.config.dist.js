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
            fs: "empty",
            console: false,
            process: false,
            global: true,
            __filename: false,
            __dirname: false,
            Buffer: true,
            setImmediate: false,
        },
        output: {
            library: 'menneu',

            libraryTarget: 'umd',
            filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            devtoolModuleFilenameTemplate: void 0
        },
        resolve: {
            alias: {
                'babel/polyfill': path.resolve(__dirname, 'src/empty'),
            },
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
        plugins: [],
        devtool: 'source-map'
    },

]}