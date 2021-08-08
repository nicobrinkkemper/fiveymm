import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs'

const levelsDir = path.join(__dirname, 'levels');
const makersDir = path.join(__dirname, 'makers');
const levels = fs.readdirSync(levelsDir).map(v => levelsDir + '/' + v);
const makers = fs.readdirSync(makersDir).map(v => makersDir + '/' + v);
const config: webpack.Configuration[] = [{
  mode: 'production',
  entry: levels,
  output: {
    path: path.resolve(__dirname, 'levelImages'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'levelImages',
    filename: 'levelImages.bundle.js'
  },
  resolve: {
    extensions: ['.png'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        include: [
          levelsDir
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "[name]-[width].[ext]",
              sizes: [1920,1280,960,480],
              fallback: require.resolve('responsive-loader'),
            },
          },
        ],
      }
    ]
  },
},{
  mode: 'production',
  entry: makers,
  output: {
    path: path.resolve(__dirname, 'makerImages'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'makerImages',
    filename: 'makerImages.bundle.js'
  },
  resolve: {
    extensions: ['.png'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        include: [
          makersDir
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "[name]-[width].[ext]",
              sizes: [500,250],
              fallback: require.resolve('responsive-loader'),
            },
          },
        ],
      }
    ]
  },
}];

export default config