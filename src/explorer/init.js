/*------------------------------------------------------------------------------------------------\
  Initialize explorer
\------------------------------------------------------------------------------------------------*/

export function init(data) {
  var settings = this.config;
  this.data = data;

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
