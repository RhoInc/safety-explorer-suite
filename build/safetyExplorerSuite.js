var safetyExplorerSuite = (function () {
  'use strict';

  //Simple convienence function to load multiple files in parallel.
  // input files is an array of objects structured as follows:
  // [
  // {path:'myAEs.csv', type:"AE"},
  // {path:'myLabs.csv', type:"Labs"}
  //]
  //

  function loadFiles(explorer, dataFiles) {
    var remaining = dataFiles.length;
    dataFiles.forEach(function (file) {
      d3.csv(file.path, function (csv) {
        console.log("Loaded " + file.path);
        file.raw = csv;
        if (! --remaining) {
          console.log("initializing charts");
          explorer.init(dataFiles);
        }
      });
    });
  }

  function init(dataArray) {
    var loadcsv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (loadcsv) {
      //load the csvs if requested
      loadFiles(this, dataArray);
    } else {
      //otherwise initialize the charts

      this.data = dataArray;
      //create wrapper in specified div
      this.wrap = d3.select(this.element).append("div").attr("class", "web-codebook-explorer");

      //layout the divs
      this.layout(this);

      //draw nav
      this.nav.init(this);

      //draw first codebook
      //  this.config.charts[0].render()
    }
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
    css: "css/aeTable.css",
    data: "AEs"
  }, {
    name: "aetimelines",
    label: "AE Timeline",
    main: "aeTimelines",
    sub: null,
    css: null,
    data: "AEs"
  }, {
    name: "safety-histogram",
    label: "Results Over Time",
    main: "safetyHistogram",
    sub: null,
    css: null,
    data: "Labs"
  }, {
    name: "safety-outlier-explorer",
    label: "Histogram",
    main: "safetyOutlierExplorer",
    sub: null,
    css: null,
    data: "Labs"
  }, {
    name: "safety-results-over-time",
    label: "Outlier Explorer",
    main: "safetyResultsOverTime",
    sub: null,
    css: null,
    data: "Labs"
  }, {
    name: "safety-shift-plot",
    label: "Shift Plot",
    main: "safetyShiftPlot",
    sub: null,
    css: null,
    data: "Labs"
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
      loadFiles: loadFiles,
      charts: charts
    };

    return explorer;
  }

  var index = {
    createExplorer: createExplorer
  };

  return index;

}());