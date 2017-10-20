/*------------------------------------------------------------------------------------------------\
  Initialize explorer
\------------------------------------------------------------------------------------------------*/

import { loadFiles } from "./loadFiles";
import { loadSettings } from "./loadSettings";

export function init(dataArray, loadcsv = false) {
  if (loadcsv) {
    //load the csvs if requested
    loadFiles(this, dataArray);
  } else {
    //otherwise initialize the charts
    this.data = dataArray;

    // prep settings & customize renderers
    this.prepSettings(this);

    //create wrapper in specified div
    this.wrap = d3
      .select(this.element)
      .append("div")
      .attr("class", "web-codebook-explorer");

    //layout the divs
    this.layout(this);

    //draw nav
    this.nav.init(this);

    //load chart settings (if needed) and then prep the renderers and draw first codebook
    console.log(this);
    if (this.config.chartSettings.load) {
      loadSettings(this);
    } else {
      this.charts.init(this);
      this.charts.renderers[0].render();
    }
  }
}
