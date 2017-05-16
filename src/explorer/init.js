/*------------------------------------------------------------------------------------------------\
  Initialize explorer
\------------------------------------------------------------------------------------------------*/

import { loadFiles } from "./loadFiles";

export function init(dataArray, loadcsv = false) {
  if (loadcsv) {
    //load the csvs if requested
    loadFiles(this, dataArray);
  } else {
    //otherwise initialize the charts

    this.data = dataArray;
    //create wrapper in specified div
    this.wrap = d3
      .select(this.element)
      .append("div")
      .attr("class", "web-codebook-explorer");

    //layout the divs
    this.layout(this);

    //draw nav
    this.nav.init(this);

    //draw first codebook
    //  this.config.charts[0].render()
  }
}
