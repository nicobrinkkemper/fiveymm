const csvPlugin = require("craco-csv-loader");

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
    }
  },
  plugins: [
    {
      plugin: csvPlugin,
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }
  ],
  webpack: {
      /** In order for react-snap to work, we drop all console logs */
    configure: webpackConfig => {
        console.log(process.env.NODE_ENV)
      if (process.env.NODE_ENV === "production") {
        // remove console in production
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          i => i.constructor.name === "TerserPlugin"
        );
        if (TerserPlugin) {
          TerserPlugin.options.terserOptions.compress["drop_console"] = true;
        }
      }

      return webpackConfig;
    }
  }
};
