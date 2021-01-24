const path = require("path");

module.exports = {
    entry: {
        "dashboard-module": "./wwwroot/app/dashboard-module.ts"
    },
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: "[name].js",
        publicPath: "/",
        module: true
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    experiments: {
        outputModule: true
    }
};