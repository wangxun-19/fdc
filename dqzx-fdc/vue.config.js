const Timestamp = new Date().getTime();

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];

module.exports={
    outputDir: "dist",

    assetsDir: "static",

    indexPath: "index.html",

    filenameHashing: true,

    pages:{
        index: {
            // entry for the pages
            entry: "src/main.js",
            // the source template
            template: "public/index.html",
            // output as dist/index.html
            filename: "index.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "首页",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        },
    },
    lintOnSave: false,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    configureWebpack: {
        output: {},
        plugins: [
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp(
                    "\\.(" + productionGzipExtensions.join("|") + ")$"
                ),
                threshold: 10240,
                minRatio: 0.8
            })

            
        ],
        externals: {
            vue: "Vue",
            axios: "axios",
            "vue-router": "VueRouter",
            vant: "vant"
        }
    },

    devServer:{
        open: true,
        port: 9001,
        proxy:{
            '/api':{
                target:'http://house-api.zjlaishang.com:9001',
                ws: true,
                changeOrigin:true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        }
    }
}