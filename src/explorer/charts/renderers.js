const renderers = [
  {
    name: "aeexplorer",
    label: "AE Explorer",
    main: "aeTable",
    sub: "createChart",
    css: "css/aeTable.css",
    data: "AEs",
    settings: {}
  },
  {
    name: "ae-timelines",
    label: "AE Timeline",
    main: "aeTimelines",
    sub: null,
    css: null,
    data: "AEs",
    settings: {}
  },
  {
    name: "safety-histogram",
    label: "Histogram",
    main: "safetyHistogram",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  },
  {
    name: "safety-outlier-explorer",
    label: "Outlier Explorer",
    main: "safetyOutlierExplorer",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  },
  {
    name: "safety-results-over-time",
    label: "Results Over Time",
    main: "safetyResultsOverTime",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  },
  {
    name: "safety-shift-plot",
    label: "Shift Plot",
    main: "safetyShiftPlot",
    sub: null,
    css: null,
    data: "Labs",
    settings: {}
  }
];

export default renderers;
