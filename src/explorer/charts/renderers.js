const renderers = [
  {
    name: "aeexplorer",
    label: "AE Explorer",
    main: "aeTable",
    sub: "createChart",
    css: "css/aeTable.css"
  },
  {
    name: "aetimelines",
    label: "AE Timeline",
    main: "aeTimelines",
    sub: null,
    css: null
  },
  {
    name: "safety-histogram",
    label: "Results Over Time",
    main: "safetyHistogram",
    sub: null,
    css: null
  },
  {
    name: "safety-outlier-explorer",
    label: "Histogram",
    main: "safetyOutlierExplorer",
    sub: null,
    css: null
  },
  {
    name: "safety-results-over-time",
    label: "Outlier Explorer",
    main: "safetyResultsOverTime",
    sub: null,
    css: null
  },
  {
    name: "safety-shift-plot",
    label: "Shift Plot",
    main: "safetyShiftPlot",
    sub: null,
    css: null
  }
];

export default renderers;
