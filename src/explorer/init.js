import { loadFiles } from './loadFiles';
import { loadSettings } from './loadSettings';
import mergeData from './mergeData';

export function init(dataArray, loadcsv = false, sdtm = false) {
    if (loadcsv) loadFiles(this, dataArray, sdtm);
    // load the csvs if requested
    else {
        //otherwise initialize the charts
        this.dataArray = dataArray;

        //Merge SDTM data.
        if (sdtm) mergeData.call(this);
        this.data = this.dataArray;

        //Initialize data customizations callback
        this.events.onDatatransform.call(this);

        // prep settings & customize renderers
        this.prepSettings(this);

        //create wrapper in specified div
        this.wrap = d3
            .select(this.element)
            .append('div')
            .attr('class', 'safety-explorer');

        //layout the divs
        this.layout(this);

        //draw nav
        this.nav.init(this);

        //load chart settings (if needed) and then prep the renderers and draw first codebook
        if (this.config.chartSettings.load) loadSettings(this);
        else {
            this.charts.init(this);
            this.config.initial_renderer.render();
        }
    }
}
