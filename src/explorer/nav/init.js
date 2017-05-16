export function init(explorer) {
  console.log(explorer);
  explorer.nav.wrap.selectAll("*").remove();

  var chartNav = explorer.nav.wrap.append("ul").attr("class", "nav nav-tabs");

  var chartNavItems = chartNav
    .selectAll("li")
    .data(explorer.charts.renderers)
    .enter()
    .append("li")
    .classed("active", function(d, i) {
      i == 0;
    })
    .append("a")
    .text(function(d) {
      return d.label;
    });

  chartNavItems.on("click", function(d) {
    if (!d3.select(this).classed("active")) {
      explorer.chartWrap.selectAll("*").remove();
      chartNavItems.classed("active", false);
      d3.select(this).classed("active", true);
      d.render();
    }
  });
}
