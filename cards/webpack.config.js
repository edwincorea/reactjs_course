const path = require("path"),
    _ = require("lodash"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendor = [
    "lodash"
];

function createConfig(isDebug){
    //source mappinge
    const devtool = isDebug ? "cheap-module-source-map" : null;

    const plugins = [
        //extract vendor components from main bundle
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        //define JS variables in the resulting bundle
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: `"${process.env.NODE_ENV || "development"}"`
            },
            IS_PRODUCTION: !isDebug,
            IS_DEVELOPMENT: isDebug
        })
    ];

    const loaders = {
        js:     { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/ },
        eslint: { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ },
        json:   { test: /\.json$/, loader: "json" },
        css:    { test: /\.css$/,  loader: "style!css?sourceMap" },       
        sass:   { test: /\.scss$/, loader: "style!css?sourceMap!sass?sourceMap" },        
        //file smaller than 5000 bytes, inline.
        files:  { test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, loader: "url-loader?limit=5000" }
    };

    const clientEntry = ["./src/client/client.js"];
    let publicPath = "/build/";

    if (isDebug) {  
    } else {
        plugins.push(
            //Search for equal or similar files and deduplicate them in the output.
            new webpack.optimize.DedupePlugin(),
            new ExtractTextPlugin("[name].css"),
            new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        );

        loaders.css.loader = ExtractTextPlugin.extract("style", "css");
        loaders.sass.loader = ExtractTextPlugin.extract("style", "css!sass");
    }

    return {
        name: "client",
        devtool,
        entry: {
            app: clientEntry,
            vendor
        },
        output: {
            path: path.join(__dirname, "public", "build"),
            filename: "[name].js",
            publicPath
        },
        resolve: {
            extensions: ["", ".js", ".jsx"],
            alias: {
                shared: path.join(__dirname, "src", "server", "shared")
            }
        },
        module: {
            loaders: _.values(loaders)
        },
        plugins 
    };
}

module.exports = createConfig(process.env.NODE_ENV !== "production");
module.exports.create = createConfig; 