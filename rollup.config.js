import babel from 'rollup-plugin-babel';

module.exports = {
  moduleName: 'safetyExplorerSuite',
  entry: './src/index.js',
  dest: './build/safetyExplorerSuite.js',
  format: 'iife',
  globals: {
    d3: 'd3',
    webcharts: 'webCharts',
    aeexplorer: "aeexplorer",
    aetimelines: "ae-timelines",
    safetyhistogram: "safety-histogram",
    safetyresultsovertime: "safety-results-over-time",
    safetyshiftplot: "safety-shift-plot",
    safetyoutlierexplorer: "safety-outlier-explorer"
  },
  external: (function() {
    var dependencies = require('./package.json').dependencies;

    return Object.keys(dependencies);
  }()),
  plugins: [
    babel(
      {
        "presets": [
          [
            "es2015",
            {
              "modules": false
            }
          ]
        ],
        "plugins": [
          "external-helpers"
        ],
        "exclude": "node_modules/**"
      })
  ]
};
