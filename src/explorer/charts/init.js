import { prepSettings } from './prepSettings';

export function init(explorer) {
    prepSettings(explorer);
    explorer.charts.renderers.forEach(function(renderer) {
        //link the data
        if (renderer.name == 'web-codebook') {
            renderer.settings.files = explorer.data.map(dataset => {
                return {
                    Data: dataset.spec,
                    Rows: dataset.data.length,
                    Columns: dataset.variables.length,
                    json: dataset.data
                };
            });
            renderer.dataFile = null;
        } else {
            renderer.dataFile = explorer.data.find(dataset => dataset.spec === renderer.spec);
        }

        //add render method
        //     var mainFunction = cat.controls.mainFunction.node().value;
        renderer.render = function() {
            if (renderer.sub) {
                //var subFunction = cat.controls.subFunction.node().value;
                explorer.currentChart = window[renderer.main][renderer.sub](
                    explorer.element + ' .chartWrap',
                    renderer.settings
                );
            } else {
                explorer.currentChart = window[renderer.main](
                    explorer.element + ' .chartWrap',
                    renderer.settings
                );
            }
            explorer.currentChart.key = renderer.name;
            explorer.currentChart.renderer = renderer;

            if (renderer.dataFile) {
                explorer.currentChart.init(renderer.dataFile.data.map(d => Object.assign({}, d)));
            } else {
                explorer.currentChart.init();
            }

            //call the chartinit callback
            explorer.events.onChartinit.call(explorer);
        };

        //add destroy method
        renderer.destroy = function() {};
    });
}
