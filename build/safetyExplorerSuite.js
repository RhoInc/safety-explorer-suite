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

  function loadSettings(explorer) {
    //parse the settings object to get the path
    var location = explorer.config.chartSettings.location.path ? explorer.config.chartSettings.location.path + explorer.config.chartSettings.location.file + ".json" : "library";

    //load the settings object
    if (location == "library") {
      explorer.config.chartSettings.imported = explorer.settingsLibrary[explorer.config.chartSettings.location.file];
      explorer.config.chartSettings.load = false;
      explorer.charts.init(explorer);
      explorer.charts.renderers[0].render();
    } else {
      d3.json(location, function (error, json) {
        if (error) {
          console.log("Couldn't load settings from json.");
          console.log(error);
        } else {
          explorer.config.chartSettings.imported = json;
          explorer.config.chartSettings.load = false;
          explorer.charts.init(explorer);
          explorer.charts.renderers[0].render();
        }
      });
    }
  }

  function init(dataArray) {
    var loadcsv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (loadcsv) {
      //load the csvs if requested
      loadFiles(this, dataArray);
    } else {
      //otherwise initialize the charts
      this.data = dataArray;

      //Initialize data customizations callback
      this.events.onDatatransform.call(this);

      // prep settings & customize renderers
      this.prepSettings(this);

      //create wrapper in specified div
      this.wrap = d3.select(this.element).append("div").attr("class", "web-codebook-explorer");

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

  /*------------------------------------------------------------------------------------------------\
    Generate HTML containers.
  \------------------------------------------------------------------------------------------------*/

  function layout() {
    if (this.config.title) this.wrap.append("h1").text(this.config.title).style("margin-bottom", "0.2em").style("margin-top", "0.2em");

    if (this.config.instructions) this.wrap.append("div").append("small").text(this.config.instructions);
    this.nav.wrap = this.wrap.append("div").attr("class", "nav");
    this.chartWrap = this.wrap.append("div").attr("class", "chartWrap");
  }

  function init$1(explorer) {
    explorer.nav.wrap.selectAll("*").remove();

    var chartNav = explorer.nav.wrap.append("ul").attr("class", "nav nav-tabs");

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

  // Set renderers.settings using the following (in order or preference):
  // chartSettings.custom
  // chartSettings.imported
  // renderer.settings

  function prepSettings(explorer) {
    explorer.charts.renderers.forEach(function (renderer) {
      var customMatch = explorer.config.chartSettings.custom ? explorer.config.chartSettings.custom.filter(function (f) {
        return f.renderer_name == renderer.name;
      }) : [];
      var importedMatch = explorer.config.chartSettings.imported ? explorer.config.chartSettings.imported.filter(function (f) {
        return f.renderer_name == renderer.name;
      }) : [];

      if (customMatch.length) {
        renderer.settings = customMatch[0];
      } else if (importedMatch.length) {
        renderer.settings = importedMatch[0];
      }
    });

    //initialize user settings customizations
    explorer.events.onChartconfig.call(explorer);
  }

  function init$2(explorer) {
    prepSettings(explorer);
    explorer.charts.renderers.forEach(function (renderer) {
      //link the data
      renderer.dataFile = explorer.data.filter(function (d) {
        return d.type == renderer.data;
      })[0];

      //add render method
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
    settings_path: null,
    settings: null,
    title: null,
    instructions: null,
    chartSettings: {
      custom: null,
      location: {}
    }
  };

  function prepSettings$1(explorer) {
    //set defaults and update the renderers accordingly
    explorer.config.renderers = explorer.config.renderers || defaultSettings.renderers;

    //only keep the selected renderers (or keep them all if none are specified)
    if (explorer.config.renderers) {
      explorer.charts.renderers = explorer.charts.renderers.filter(function (d) {
        return explorer.config.renderers.indexOf(d.name) > -1;
      });
    }

    //Title and instructions
    explorer.config.title = explorer.config.title || defaultSettings.title;
    explorer.config.instructions = explorer.config.instructions || defaultSettings.instructions;

    //chartSettings object
    explorer.config.chartSettings = explorer.config.chartSettings || defaultSettings.chartSettings;

    //Map depricated custom_settings object to config.chartSettings.custom (if no other settings are provided)
    if (explorer.config.custom_settings.length & !explorer.config.chartSettings.custom) {
      explorer.config.chartSettings.custom = explorer.config.custom_settings;
    }

    //Attempt to load the settings if a file is specified
    explorer.config.chartSettings.load = explorer.config.chartSettings.location.file ? true : false;
  }

  var safetyExplorerDefault = [
  ////////////////////////////////////////////////////
  // 1 - AE Explorer Settings
  ////////////////////////////////////////////////////
  {
    renderer_name: "aeexplorer",
    variables: {
      id: "USUBJID",
      major: "AEBODSYS",
      minor: "AEDECOD",
      group: "SEX",
      details: ["USUBJID", "SITEID", "SEX", "RACE", "AESTDTC", "AESTDY", "AEENDTC", "AEENDY", "AETERM", "AEDECOD", "AEBODSYS", "AESER", "AESEV", "AEREL", "AEOUT"]
    },
    filters: [{
      value_col: "AESER",
      label: "Serious?"
    }, {
      value_col: "AESEV",
      label: "Severity"
    }, {
      value_col: "AEREL",
      label: "Relationship"
    }, {
      value_col: "AEOUT",
      label: "Outcome"
    }],
    groups: [],
    defaults: {
      maxPrevalence: 0,
      groupCols: false,
      totalCol: true,
      diffCol: false,
      prefTerms: false
    },
    validation: false
  },
  ////////////////////////////////////////////////////
  // 2 - AE Timeline Settings
  ////////////////////////////////////////////////////
  {
    renderer_name: "ae-timelines",
    stdy_col: "AESTDY",
    endy_col: "AEENDY",
    filters: [{ value_col: "AESEV", label: "Severity/Intensity" }, { value_col: "USUBJID", label: "Subject Identifier" }, { value_col: "SITEID", label: "Site ID" }, { value_col: "AEBODSYS", label: "Body System" }, { value_col: "AEDECOD", label: "Preferred Term" }],
    color: {
      value_col: "AESEV",
      label: "Severity/Intensity",
      values: ["MILD", "MODERATE", "SEVERE", "NA"],
      colors: ["#66bd63", // green
      "#fdae61", // sherbet
      "#d73027", // red
      "gray"]
    }
  },
  ////////////////////////////////////////////////////
  // 3 - Safety outlier explorer
  ////////////////////////////////////////////////////
  {
    renderer_name: "safety-outlier-explorer",
    time_cols: [{
      value_col: "DY",
      type: "linear",
      label: "Study Day",
      rotate_tick_labels: false,
      vertical_space: 0
    }, {
      value_col: "VISTPTN",
      type: "ordinal",
      label: "Visit Number",
      rotate_tick_labels: false,
      vertical_space: 0
    }, {
      value_col: "VISTPT",
      type: "ordinal",
      label: "Visit",
      rotate_tick_labels: true,
      vertical_space: 100
    } // Specify vertical space for rotated tick labels.  Maps to [margin.bottom].
    ],
    filters: [{ value_col: "SITEID", label: "Site" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }]
  },
  ////////////////////////////////////////////////////
  // 4 - Paneled outlier explorer
  ////////////////////////////////////////////////////
  {
    renderer_name: "paneled-outlier-explorer",
    time_cols: [{
      value_col: "DY",
      type: "linear",
      label: "Study Day",
      rotate_tick_labels: false,
      vertical_space: 0
    }, {
      value_col: "VISTPTN",
      type: "ordinal",
      label: "Visit Number",
      rotate_tick_labels: false,
      vertical_space: 0
    }, {
      value_col: "VISTPT",
      type: "ordinal",
      label: "Visit",
      rotate_tick_labels: true,
      vertical_space: 100
    }],
    filters: [{ value_col: "USUBJID", label: "Subject ID" }, { value_col: "SITEID", label: "Site" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }]
  },
  ////////////////////////////////////////////////////
  // 5 - Histogram
  ////////////////////////////////////////////////////
  {
    renderer_name: "safety-histogram",
    filters: [{ value_col: "SITEID", label: "Site" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }, { value_col: "VISTPT", label: "Visit" }]
  },
  ////////////////////////////////////////////////////
  // 6 - Results over time Settings
  ////////////////////////////////////////////////////
  {
    renderer_name: "safety-results-over-time",
    time_settings: {
      value_col: "VISTPT",
      label: "Visit",
      order: null, // x-axis domain order (array)
      rotate_tick_labels: false,
      vertical_space: 100
    },
    x: {
      column: null, // set in syncSettings()
      type: "ordinal",
      label: null,
      behavior: "raw",
      sort: "alphabetical-ascending",
      tickAttr: null
    },
    groups: [{ value_col: "NONE", label: "None" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }],
    filters: [{ value_col: "SITEID", label: "Site" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }]
  },
  ////////////////////////////////////////////////////
  // 7 - Shift PLot Settings
  ////////////////////////////////////////////////////
  {
    renderer_name: "safety-shift-plot",
    time_col: "VISTPT",
    x_params: { visits: ["Screening"], stat: "mean" },
    filters: [{ value_col: "SITEID", label: "Site" }, { value_col: "SEX", label: "Sex" }, { value_col: "RACE", label: "Race" }, { value_col: "AGEGROUP", label: "Age Group" }],
    resizable: true,
    max_width: 600
  }];

  var settingsLibrary = {
    safetyExplorerDefault: safetyExplorerDefault
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
      prepSettings: prepSettings$1,
      charts: charts,
      settingsLibrary: settingsLibrary
    };

    explorer.events = {
      onDatatransform: function onDatatransform() {},
      onChartconfig: function onChartconfig() {}
    };

    explorer.on = function (event, callback) {
      var possible_events = ["datatransform", "chartconfig"];
      if (possible_events.indexOf(event) < 0) {
        return;
      }
      if (callback) {
        explorer.events["on" + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
      }
    };
    return explorer;
  }

  var index = {
    createExplorer: createExplorer
  };

  return index;

}());