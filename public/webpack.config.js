var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
         'mom2015': './javascripts/mom2015/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].bundle.js',
    },
    plugins: [ new webpack.optimize.CommonsChunkPlugin('shared-modules.js') ],
    resolve: {
        extensions: [
            '', '.js', '.jsx', '.css',
        ],
        root: [ path.resolve(__dirname, 'node_modules') ],
        alias: {
            'famous': 'famous/src'
        },
    },
    resolveLoader: {
        root: [ path.resolve(__dirname, 'node_modules') ]
    },
    module: {
        loaders: [

            // Support for ES6 modules and the latest ES syntax.
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        //'es2015', // specified manually below.
                        'react' // for React JSX.
                    ],
                    plugins: [

                        // es2015 preset, manual version:
                        'transform-es2015-arrow-functions',
                        'transform-es2015-block-scoped-functions',
                        'transform-es2015-block-scoping',
                        'transform-es2015-classes',
                        'transform-es2015-computed-properties',
                        'transform-es2015-destructuring',
                        'transform-es2015-for-of',
                        'transform-es2015-function-name',
                        'transform-es2015-literals',
                        'transform-es2015-modules-commonjs',
                        'transform-es2015-object-super',
                        'transform-es2015-parameters',
                        'transform-es2015-shorthand-properties',
                        'transform-es2015-spread',
                        'transform-es2015-sticky-regex',
                        'transform-es2015-template-literals',
                        'transform-es2015-typeof-symbol',
                        'transform-es2015-unicode-regex',
                        'transform-regenerator', // not needed in Chrome or Firefox. Soon won't be needed in Edge or Safari.

                        'transform-async-to-generator',

                        'transform-es5-property-mutators',
                    ],
                },
            },

            // For loading CSS files.
            { test: /\.css$/, loader: 'style!css' },

            //images
            { test: /\.(png|jpg|jpeg)$/, loader: 'url' },

            //// temporary support for Famous/engine's glslify transform requirement.
            //// TODO: Make rocket:module detect and apply browserify transforms.
            //{ test: /\.js$/, loader: 'transform/cacheable?glslify'},
            // dependencies for npm.json:
            //  "transform-loader": "^0.2.0",
            //  "glslify": "^2.0.0"

            //// glsl files.
            ////{ test: /\.glsl$/, loader: 'glslify!raw' }
            //{ test: /\.(glsl|frag|vert)$/, loader: 'raw' },
            //{ test: /\.(glsl|frag|vert)$/, loader: 'glslify' }
        ]
    },
    //cache: webpackCacheObject[platform],
}
