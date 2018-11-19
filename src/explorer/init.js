/*------------------------------------------------------------------------------------------------\
  Initialize explorer
\------------------------------------------------------------------------------------------------*/

import { loadFiles } from './loadFiles';
import mergeData from './mergeData';

export function init(dataArray, loadcsv = false, sdtm = false) {
    if (loadcsv) {
        //load the csvs if requested
        loadFiles(this, dataArray, sdtm);
    } else {
        //otherwise initialize the charts
        this.dataArray = dataArray;

        //Merge SDTM data.
        if (sdtm) mergeData.call(this);
        this.data = this.dataArray;

        // prep settings & customize renderers
        this.prepSettings(this);

        //create wrapper in specified div
        this.wrap = d3
            .select(this.element)
            .append('div')
            .attr('class', 'web-codebook-explorer');

        //layout the divs
        this.layout(this);

        //draw nav
        this.nav.init(this);

        //prep the renderers and draw first codebook
        this.charts.init(this);
        this.config.initial_renderer.render();
    }
}
