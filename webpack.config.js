const ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackPreBuildPlugin = require('pre-build-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let find = require('find');
let fs = require('fs');
var WebpackPreBuildPlugin = require('pre-build-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    ReactLoadablePlugin
  } = require("@jahredhope/react-loadable-webpack-plugin");
  
module.exports = env => {
    return {
        entry: {
            app: ['./index.js', './assets/vendor/bootstrap/bootstrap.min.css', './assets/vendor/icon-awesome/css/font-awesome.min.css', './assets//vendor/icon-hs/style.css', './assets/vendor/dzsparallaxer/dzsparallaxer.css', './assets/vendor/dzsparallaxer/dzsscroller/scroller.css', './assets/vendor/dzsparallaxer/advancedscroller/plugin.css', './assets/vendor/animate.css', './assets/vendor/hs-megamenu/src/hs.megamenu.css', './assets/vendor/hamburgers/hamburgers.min.css', './assets/css/unify.css', './assets/css/custom.css'
                /*
                    ,'./assets/vendor/tether.min.js'
                    ,'./assets/vendor/bootstrap/bootstrap.min.js'
                    ,'./assets/vendor/hs-megamenu/src/hs.megamenu.js'
                    ,'./assets/vendor/dzsparallaxer/dzsparallaxer.js'
                    ,'./assets/vendor/dzsparallaxer/dzsscroller/scroller.js'
                    ,'./assets/vendor/dzsparallaxer/advancedscroller/plugin.js'
                    ,'./assets/vendor/typedjs/typed.min.js'
                  
                    ,'./assets/js/hs.core.js'
                    ,'./assets/js/components/hs.header.js'
                    ,'./assets/js/helpers/hs.hamburgers.js'
                    ,'./assets/js/components/hs.go-to.js'*/
            ]
            //,'./public/city_guide.scss','./public/awesomplete.css'
        },
        target: "web",
        devServer: {
            historyApiFallback: true,
        },
        devtool: 'source-map',

        optimization: {
            minimizer: [ new OptimizeCSSAssetsPlugin({}),new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        reduce_vars: false,
                        collapse_vars: false
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),]
        },
        output: {
            path: __dirname + '/.compiled/Components',
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        
        mode: 'development',
        module: {

            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
                ,
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it uses publicPath in webpackOptions.output
                                publicPath: '../',
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|gif|cur|woff|eot|ttf|svg|dtd|woff2)$/,
                    use: [{
                        loader: 'url-loader'
                    }]
                }
            ]
        },
        plugins: [
            
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'bundle.css',
            }), new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new ReactLoadablePlugin({
                filename: "react-loadable.json"
              }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV)
            }),
            new WebpackPreBuildPlugin(function (stats) {
                console.log('Reducer build');
                let dirname = __dirname + ''
                let files = find.fileSync('reducer.js', dirname);
                let result = files.map(item => {
                    let result = item.replace(dirname, '.').replace(/\\/g, '/');
                    let size = result.split('/').length;

                    return {
                        name: result.split('/')[size - 2] + 'Reducer',
                        path: result
                    }
                })
                let exportTxt = ' export default {';
                exportTxt += result.map(item => { return item.name }).join(',');
                exportTxt += '}';
                let importTxt = result.map(item => { return `import ${item.name} from '${item.path}';\n` }).join(' ')
                try {
                    let filebody = fs.readFileSync(dirname + '/reducers.scenes.js');
                    if (filebody.toString() == `${importTxt}${exportTxt}`) {
                        return;
                    }
                } catch (ex) {
                    console.log(ex);

                }
                const data = new Uint8Array(Buffer.from(`${importTxt}${exportTxt}`));
                fs.writeFileSync(dirname + '/reducers.scenes.js', data);
                console.log('REDUCES FINISHED');

                //  import( __dirname.replace(/\\/g,'/')+'/build_reducers.js');
                // Do whatever you want before build starts...
            })


        ]
    };
}