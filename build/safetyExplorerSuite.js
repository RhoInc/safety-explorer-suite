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
        file.raw = csv;
        if (! --remaining) {
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

      // prep settings & customize renderers
      this.prepSettings(this);

      //create wrapper in specified div
      this.wrap = d3.select(this.element).append("div").attr("class", "web-codebook-explorer");

      //layout the divs
      this.layout(this);

      //draw nav
      this.nav.init(this);

      //prep the renderers and draw first codebook
      this.charts.init(this);
      this.charts.renderers[0].render();
    }
  }

  /*------------------------------------------------------------------------------------------------\
    Generate HTML containers.
  \------------------------------------------------------------------------------------------------*/

  function layout() {
    if (this.config.title) this.wrap.append("h1").text(this.config.title).style("margin-bottom", "0.2em").style("margin-top", "0.2em");

    if (this.config.instructions) this.wrap.append("div").append("small").text(this.config.instructions);
    this.nav.wrap = this.wrap.append("div").attr("class", "ses-nav");
    this.chartWrap = this.wrap.append("div").attr("class", "chartWrap");
  }

  function init$1(explorer) {
    explorer.nav.wrap.selectAll("*").remove();

    var chartNav = explorer.nav.wrap.append("ul").attr("class", "ses-nav ses-nav-tabs");

    var chartNavItems = chartNav.selectAll("li").data(explorer.charts.renderers).enter().append("li").classed("active", function (d, i) {
      return i == 0;
    });

    chartNavItems.append("a").text(function (d) {
      return d.label;
    });

    chartNavItems.on("click", function (d) {
      if (!d3.select(this).classed("active")) {
        explorer.chartWrap.selectAll("*").remove();
        chartNavItems.classed("active", false);
        d3.select(this).classed("active", true);
        d.render();
      }
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
    data: "AEs",
    settings: {}
  }, {
    name: "ae-timelines",
    label: "AE Timeline",
    main: "aeTimelines",
    sub: null,
    css: null,
    data: "AEs",
    settings: {}
  }, {
    name: "safety-histogram",
    label: "Histogram",
    main: "safetyHistogram",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }, {
    name: "safety-outlier-explorer",
    label: "Outlier Explorer",
    main: "safetyOutlierExplorer",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }, {
    name: "paneled-outlier-explorer",
    label: "Paneled Outlier Explorer",
    main: "paneledOutlierExplorer",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }, {
    name: "safety-results-over-time",
    label: "Results Over Time",
    main: "safetyResultsOverTime",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }, {
    name: "safety-shift-plot",
    label: "Shift Plot",
    main: "safetyShiftPlot",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }];

  function init$2(explorer) {
    explorer.charts.renderers.forEach(function (renderer) {
      //link the data
      renderer.dataFile = explorer.data.filter(function (d) {
        return d.type == renderer.data;
      })[0];

      //add render method
      //     var mainFunction = cat.controls.mainFunction.node().value;
      renderer.render = function () {
        if (renderer.sub) {
          //var subFunction = cat.controls.subFunction.node().value;
          var myChart = window[renderer.main][renderer.sub](explorer.element + " .chartWrap", renderer.settings);
        } else {
          var myChart = window[renderer.main](explorer.element + " .chartWrap", renderer.settings);
        }
        myChart.init(renderer.dataFile.raw);

        //add destroy method
        renderer.destroy = function () {};
      };
    });
  }

  var charts = {
    renderers: renderers,
    init: init$2
  };

  var defaultSettings = {
    renderers: null,
    custom_settings: null,
    title: null,
    instructions: null
  };

  function prepSettings(explorer) {
    //set defaults and update the renderers accordingly
    explorer.config.renderers = explorer.config.renderers || defaultSettings.renderers;
    explorer.config.custom_settings = explorer.config.custom_settings || defaultSettings.custom_settings;

    //only keep the selected renderers (or keep them all if none are specified)
    if (explorer.config.renderers) {
      explorer.charts.renderers = explorer.charts.renderers.filter(function (d) {
        return explorer.config.renderers.indexOf(d.name) > -1;
      });
    }

    //customize the settings (or use the default settings if nothing is specified)
    if (explorer.config.custom_settings) {
      explorer.config.custom_settings.forEach(function (custom_setting) {
        var thisRenderer = explorer.charts.renderers.filter(function (renderer) {
          return custom_setting.renderer_name == renderer.name;
        })[0];

        if (thisRenderer) thisRenderer.settings = custom_setting;
      });
    }

    //Title and instructions
    explorer.config.title = explorer.config.title || defaultSettings.title;
    explorer.config.instructions = explorer.config.instructions || defaultSettings.instructions;
  }

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
      prepSettings: prepSettings,
      charts: charts
    };

    return explorer;
  }

  var index = {
    createExplorer: createExplorer
  };

  return index;

}());
