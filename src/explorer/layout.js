/*------------------------------------------------------------------------------------------------\
  Generate HTML containers.
\------------------------------------------------------------------------------------------------*/

export function layout() {
  this.nav.wrap = this.wrap.append("div").attr("class", "nav");
  this.chartWrap = this.wrap.append("div").attr("class", "chartWrap");
}
