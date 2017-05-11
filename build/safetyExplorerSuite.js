var safetyExplorerSuite = (function () {
  'use strict';

  /*------------------------------------------------------------------------------------------------\
    Initialize explorer
  \------------------------------------------------------------------------------------------------*/

  function init(data) {
    var settings = this.config;
    this.data = data;

    //create wrapper in specified div
    this.wrap = d3.select(this.element).append("div").attr("class", "web-codebook-explorer");

    //layout the divs
    this.layout(this);

    //draw nav
    this.nav.init(this);

    //draw first codebook
    //  this.config.charts[0].render()
  }

  /*------------------------------------------------------------------------------------------------\
    Generate HTML containers.
  \------------------------------------------------------------------------------------------------*/

  function layout() {
    this.nav.wrap = this.wrap.append("div").attr("class", "nav");
    this.chartWrap = this.wrap.append("div").attr("class", "chartWrap");
  }

  function init$1(explorer) {
    console.log(explorer);
    explorer.nav.wrap.selectAll("*").remove();

    var chartNav = explorer.nav.wrap.append("ul").attr("class", "nav nav-tabs");

    var chartNavItems = chartNav.selectAll("li").data(explorer.charts.renderers).enter().append("li").classed("active", function (d, i) {
      i == 0;
    }).append("a").text(function (d) {
      return d.label;
    });

    chartNavItems.on("click", function (d) {
      console.log("Renderering " + d.main);
    });
  }

  var nav = {
    init: init$1
  };

  var renderers = [{
    name: "aeexplorer",
    label: "AE Explorer",
    main: "aeTable",
    sub: "createChart",
    css: "css/aeTable.css"
  }, {
    name: "aetimelines",
    label: "AE Timeline",
    main: "aeTimelines",
    sub: null,
    css: null
  }, {
    name: "safety-histogram",
    label: "Results Over Time",
    main: "safetyHistogram",
    sub: null,
    css: null
  }, {
    name: "safety-outlier-explorer",
    label: "Histogram",
    main: "safetyOutlierExplorer",
    sub: null,
    css: null
  }, {
    name: "safety-results-over-time",
    label: "Outlier Explorer",
    main: "safetyResultsOverTime",
    sub: null,
    css: null
  }, {
    name: "safety-shift-plot",
    label: "Shift Plot",
    main: "safetyShiftPlot",
    sub: null,
    css: null
  }];

  var charts = {
    renderers: renderers
  };

  function createExplorer() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";
    var config = arguments[1];

    var explorer = {
      element: element,
      config: config,
      init: init,
      layout: layout,
      nav: nav,
      charts: charts
    };

    return explorer;
  }

  var index = {
    createExplorer: createExplorer
  };

  return index;

}());