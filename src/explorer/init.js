import { loadFiles } from './loadFiles';
import checkDataSpecification from './checkDataSpecification';
import { loadSettings } from './loadSettings';
import mergeData from './mergeData';

export function init(data, loadcsv = false, sdtm = false) {
    // Load the .csv files if requested.
    if (loadcsv)
        loadFiles(this, data, sdtm);
    // Otherwise initialize the renderer.
    else {
        this.data = data;
        checkDataSpecification.call(this);

        //Merge SDTM data.
        if (sdtm) mergeData.call(this);

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
