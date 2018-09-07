const path = require('path');



module.exports = function (env) {
    return [{
        target: "node",
        entry: {
            'index.spec': [
                path.resolve(__dirname, 'src/_spec/index.ts')
            ]
        },
        output: {
            library: 'spec',

            libraryTarget: 'commonjs2',
            filename: '[name].js',
            path: path.resolve(__dirname, 'bin.test'),
            devtoolModuleFilenameTemplate: '../[resource-path]',
            // devtoolModuleFilenameTemplate: void 0
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.spec.json'
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
        plugins: [],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        devtool: 'source-map'
    },

]}