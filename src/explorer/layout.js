/*------------------------------------------------------------------------------------------------\
  Generate HTML containers.
\------------------------------------------------------------------------------------------------*/

export function layout() {
  if (this.config.title)
    this.wrap
      .append("h1")
      .text(this.config.title)
      .style("margin-bottom", "0.2em")
      .style("margin-top", "0.2em");

  if (this.config.instructions)
    this.wrap.append("div").append("small").text(this.config.instructions);
  this.nav.wrap = this.wrap.append("div").attr("class", "nav");
  this.chartWrap = this.wrap.append("div").attr("class", "chartWrap");
}
