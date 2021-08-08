const csvPlugin = require('craco-csv-loader')

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    style: {
        postcss: {
            env: {
                stage: 3,
                features: {
                    "nesting-rules": true
                },
                autoprefixer: {
                    cascade: true
                }
            }
        },
    },
    plugins: [
        {
            plugin: csvPlugin,
            options: {
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true
            },
        }
    ]
}