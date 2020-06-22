const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports =  {
    mode: "development",
    stats: {
        errorDetails: true,
        colors: true,
        modules: true,
        reasons: true
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    entry: {
        main: "./src/index.ts"
    },
    output: {
        path: path.join(__dirname, "lib"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        // Необходим для библиотек, которые могут быть использованы в дальнейшем,
        // чтобы библиотеки понимали, что нужна их продакшн версия без отладочных
        // фич, типа ворнингов и т.п.
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
            test: /\.(html)$/,
            loader: 'raw-loader'
        }, {
            test: /\.ts$/,
            use: [{
                loader: require.resolve('ts-loader'),
                options: {
                    compilerOptions: {
                        composite: true
                    },
                    projectReferences: true,
                    appendTsSuffixTo: [/\.vue$/],
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                esModule: true
            }
        }, {
            test: /\.s[a|c]ss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        }]
    }
};

