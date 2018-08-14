export function init(explorer) {
    explorer.charts.renderers.forEach(function(renderer) {
        //link the data
        if (renderer.name == 'web-codebook') {
            renderer.settings.files = explorer.data.map(function(d) {
                d['Data'] = d.type;
                d.Rows = d.raw.length;
                d.Columns = Object.keys(d.raw[0]).length;
                d.json = d.raw;
                return d;
            });
            renderer.dataFile = null;
        } else {
            renderer.dataFile = explorer.data.filter(function(d) {
                return d.type == renderer.data;
            })[0];
        }

        //add render method
        //     var mainFunction = cat.controls.mainFunction.node().value;
        renderer.render = function() {
            if (renderer.sub) {
                //var subFunction = cat.controls.subFunction.node().value;
                var myChart = window[renderer.main][renderer.sub](
                    explorer.element + ' .chartWrap',
                    renderer.settings
                );
            } else {
                var myChart = window[renderer.main](
                    explorer.element + ' .chartWrap',
                    renderer.settings
                );
            }

            console.log(renderer);
            console.log(myChart);

            if (renderer.dataFile) {
                myChart.init(renderer.dataFile.raw);
            } else {
                myChart.init();
            }
        };

        //add destroy method
        renderer.destroy = function() {};
    });
}
