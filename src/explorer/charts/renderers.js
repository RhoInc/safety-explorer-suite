const renderers = [
    {
        name: 'aeexplorer',
        label: 'AE Explorer',
        main: 'aeTable',
        sub: 'createChart',
        css: 'css/aeTable.css',
        spec: 'adverse-events',
        settings: {}
    },
    {
        name: 'ae-timelines',
        label: 'AE Timeline',
        main: 'aeTimelines',
        sub: null,
        css: null,
        spec: 'adverse-events',
        settings: {}
    },
    {
        name: 'safety-histogram',
        label: 'Histogram',
        main: 'safetyHistogram',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'safety-outlier-explorer',
        label: 'Outlier Explorer',
        main: 'safetyOutlierExplorer',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'paneled-outlier-explorer',
        label: 'Paneled Outlier Explorer',
        main: 'paneledOutlierExplorer',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'safety-results-over-time',
        label: 'Results Over Time',
        main: 'safetyResultsOverTime',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'safety-shift-plot',
        label: 'Shift Plot',
        main: 'safetyShiftPlot',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'safety-delta-delta',
        label: 'Delta-Delta',
        main: 'safetyDeltaDelta',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'hep-explorer',
        label: 'Hepatotoxicity Explorer',
        main: 'hepexplorer',
        sub: null,
        css: null,
        spec: 'medical-signs',
        settings: {}
    },
    {
        name: 'web-codebook',
        label: 'Codebooks',
        main: 'webcodebook',
        sub: 'createExplorer',
        css: 'css/webcodebook.css',
        spec: null,
        settings: {
            labelColumn: 'type',
            ignoredColumns: ['raw', 'fileFound', 'key', 'domain'],
            files: null
        }
    }
];

export default renderers;
