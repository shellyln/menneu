const webpack = require('webpack');
const path = require('path');



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
                    {
                        loader: 'babel-loader',
                        options: {
                            'sourceMaps': true,
                            'presets': [
                                ['env', {
                                    'targets': {
                                        // 'node': 'current'
                                        'browsers': [">0.25%", "not ie 11", "not op_mini all"]
                                        // 'Chrome': ['current']
                                    }
                                }]
                            ],
                            'ignore': [],
                        }
                    },
                    // 'babel-loader',
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.dist.json'
                    }),
                ],
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate.*)).*$/
            }, {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'sourceMaps': true,
                            'presets': [
                                ['env', {
                                    'targets': {
                                        // 'node': 'current'
                                        'browsers': [">0.25%", "not ie 11", "not op_mini all"]
                                        // 'Chrome': ['current']
                                    }
                                }]
                            ],
                            'ignore': [],
                        }
                    },
                    // 'babel-loader',
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