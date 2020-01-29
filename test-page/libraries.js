const libraries = [
    // polyfills
    {
        js: 'https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.0/dist/polyfill.min.js',
        global: 'Promise',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/dist/fetch.umd.min.js',
        global: 'fetch',
        css: null,
    },

    // dependencies
    {
        js: 'https://d3js.org/d3.v3.min.js',
        global: 'd3',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/Webcharts/build/webcharts.js',
        global: 'webCharts',
        css: 'https://cdn.jsdelivr.net/gh/RhoInc/Webcharts/css/webcharts.min.css',
    },

    // renderers
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/aeexplorer/build/aeTable.js',
        global: 'aeTable',
        css: 'https://cdn.jsdelivr.net/gh/RhoInc/aeexplorer/css/aeTable.css',
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/ae-timelines/aeTimelines.js',
        global: 'aeTimelines',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/safety-histogram/safetyHistogram.js',
        global: 'safetyHistogram',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/safety-outlier-explorer/safetyOutlierExplorer.js',
        global: 'safetyOutlierExplorer',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/paneled-outlier-explorer/build/paneledOutlierExplorer.js',
        global: 'paneledOutlierExplorer',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/safety-results-over-time/safetyResultsOverTime.js',
        global: 'safetyResultsOverTime',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/safety-shift-plot/build/safetyShiftPlot.js',
        global: 'safetyShiftPlot',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/SafetyGraphics/hep-explorer/hepexplorer.js',
        global: 'hepexplorer',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/safety-delta-delta/safetyDeltaDelta.js',
        global: 'safetyDeltaDelta',
        css: null,
    },
    {
        js: 'https://cdn.jsdelivr.net/gh/RhoInc/web-codebook/build/webcodebook.js',
        global: 'webcodebook',
        css: 'https://cdn.jsdelivr.net/gh/RhoInc/web-codebook/css/webcodebook.css',
    }
];

libraries.forEach(library => {
    loadScriptSync(library.js);

    if (library.css) {
        const link = document.createElement('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', library.css);
        document.head.appendChild(link);
    }
});
