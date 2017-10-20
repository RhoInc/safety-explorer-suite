import { prepSettings } from "./prepSettings";

export function init(explorer) {
  prepSettings(explorer);
  explorer.charts.renderers.forEach(function(renderer) {
    //link the data
    renderer.dataFile = explorer.data.filter(function(d) {
      return d.type == renderer.data;
    })[0];

    //add render method
    renderer.render = function() {
      if (renderer.sub) {
        //var subFunction = cat.controls.subFunction.node().value;
        var myChart = window[renderer.main][renderer.sub](
          explorer.element + " .chartWrap",
          renderer.settings
        );
      } else {
        var myChart = window[renderer.main](
          explorer.element + " .chartWrap",
          renderer.settings
        );
      }
      myChart.init(renderer.dataFile.raw);

      //add destroy method
      renderer.destroy = function() {};
    };
  });
}
