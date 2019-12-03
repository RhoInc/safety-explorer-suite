//Generate safety explorer given an array of data files.
function initSafetyExplorerSuite(settings, dataArray) {
    d3.selectAll('#container *').remove();
    safetyExplorerSuite
        .createExplorer(
            '#container', // element
            settings // settings
        )
        .init(
            clone(dataArray), // array of data files
            true, // load .csv files?
            true // SDTM-structured data files?
        );
}

//Array of SDTM data files.
const dataArray = [
    {
        type: 'DM', // demographics
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/dm.csv',
    },
    {
        type: 'AE', // adverse events
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/ae.csv'
    },
    {
        type: 'BDS', // basic data structure: labs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/lb.csv',
    },
    {
        type: 'BDS', // basic data structure: vital signs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/vs.csv',
    },
];

//Get safety-explorer-suite version from window hash.
const version = window.location.hash
    ? window.location.hash.substring(1)
    : 'master';
if (version !== 'master')
    loadLibrary(version);

//Wait for settings (defined below) to be available.
const waitForSettings = setInterval(
    function() {
        if (settings !== undefined) {
            clearInterval(waitForSettings);
            initSafetyExplorerSuite(settings, dataArray);
        }
    },
    1
);

/*------------------------------------------------------------------------------------------------\
 * Settings
\------------------------------------------------------------------------------------------------*/

    const filters = [
        {value_col: 'SEX', label: 'Sex'},
        {value_col: 'ARM', label: 'Treatment Group'},
        {value_col: 'RACE', label: 'Race'},
        {value_col: 'SITEID', label: 'Site'},
    ];
    const settings = {
        initial_renderer: window && window.location && window.location.hash
            ? window.location.hash.substring(1)
            : null, // allow linking to each renderer
        custom_settings: [
            {
                renderer_name: 'aeexplorer',
                variables: {
                    filters: [
                        {
                            value_col: 'AESER',
                            label: 'Serious?',
                            type: 'event',
                            start: null
                        },
                        {
                            value_col: 'AESEV',
                            label: 'Severity',
                            type: 'event',
                            start: null
                        },
                        {
                            value_col: 'AEREL',
                            label: 'Relationship',
                            type: 'event',
                            start: null
                        },
                        {
                            value_col: 'AEOUT',
                            label: 'Outcome',
                            type: 'event',
                            start: null
                        },
                    ].concat(clone(filters)),
                },
                defaults: {
                    placeholderFlag: {
                        value_col: 'AETERM',
                        values: [''],
                    },
                },
            },
            {
                renderer_name: 'ae-timelines',
                filters: [
                    {
                        value_col: 'AESER',
                        label: 'Serious?',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AESEV',
                        label: 'Severity',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEREL',
                        label: 'Relationship',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEOUT',
                        label: 'Outcome',
                        type: 'event',
                        start: null
                    },
                ].concat(clone(filters)),
            },
            {
                renderer_name: 'safety-histogram',
                filters: clone(filters),
                displayNormalRange: true,
            },
            {
                renderer_name: 'safety-outlier-explorer',
                filters: clone(filters),
            },
            {
                renderer_name: 'paneled-outlier-explorer',
                filters: clone(filters),
            },
            {
                renderer_name: 'safety-results-over-time',
                groups: clone(filters),
                filters: clone(filters),
            },
            {
                renderer_name: 'safety-shift-plot',
                filters: clone(filters),
            },
            {
                renderer_name: 'safety-delta-delta',
                filters: clone(filters),
                visits:{comparison:["WEEK 26"],baseline:[]}
            },
            {
                renderer_name: 'hep-explorer',
                group_cols: clone(filters),
                filters: clone(filters),
                measure_values:{
                    'ALT':'Alanine Aminotransferase',
                    'AST':'Aspartate Aminotransferase',
                    'TB':'Bilirubin',
                    'ALP':'Alkaline Phosphatase'
                },
            },
        ],
    };

/*------------------------------------------------------------------------------------------------\
  This code creates a dropdown of previous versions and open branches of safety-explorer-suite.
\------------------------------------------------------------------------------------------------*/

    //Load branches.
    const branchRequest = new XMLHttpRequest();
    branchRequest.onload = function() {
        const branches = JSON.parse(this.responseText)
            .map(function(branch) {
                return branch.name;
            })
            .sort(function(a,b) {
                return (
                    a === 'master' ? -1 :
                    b === 'master' ? 1 :
                    /^dev-/.test(a) && /^dev-/.test(b) ? (a > b ? -1 : 1) :
                    /^dev-/.test(a) ? -1 :
                    /^dev-/.test(b) ? 1 :
                    a < b ? -a : 1
                );
            });
        d3.select('.version-select__select')
            .selectAll('option.branch')
                .data(branches)
                .enter()
            .append('option')
            .classed('branch', true)
            .text(function(d) {
                return d;
            })
            .property('selected', function(d) {
                return d === version;
            });
    }
    branchRequest.open(
        'get',
        'https://api.github.com/repos/RhoInc/safety-explorer-suite/branches'
    );
    branchRequest.send();

    //Load releases.
    const releaseRequest = new XMLHttpRequest();
    releaseRequest.onload = function() {
        const releases = JSON.parse(this.responseText)
            .map(function(release) {
                return release.name;
            })
            .sort(d3.descending);
        d3.select('.version-select__select')
            .selectAll('option.release')
                .data(releases)
                .enter()
            .append('option')
            .classed('release', true)
            .text(function(d) {
                return d;
            })
            .property('selected', function(d) {
                return d === version;
            });
    }
    releaseRequest.open(
        'get',
        'https://api.github.com/repos/RhoInc/safety-explorer-suite/releases'
    );
    releaseRequest.send();

    //Add version select functionality.
    d3.select('.version-select__submit')
        .on('click', function() {
            const version = d3.select('.version-select__select')
                .select('option:checked')
                .text();
            loadLibrary(version);
        });

/*------------------------------------------------------------------------------------------------\
 * Other functions
\------------------------------------------------------------------------------------------------*/

    function clone(obj) {
        let copy;

        //boolean, number, string, null, undefined
        if ('object' != typeof obj || null == obj)
            return obj;

        //date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        //array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        //object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                    copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function loadLibrary(version) {
        console.log('Selected version: ' + version);
        const baseURL = 'https://cdn.jsdelivr.net/gh/RhoInc/safety-explorer-suite';
        const versionURL = version !== 'master'
            ? baseURL + '@' + version
            : baseURL;

        //Load branches.
        const pkgRequest = new XMLHttpRequest();
        pkgRequest.onload = function() {
            const pkg = JSON.parse(this.responseText);

            const main = pkg.main.replace(/^\.?\/?/, '');

            //Load .js file.
            const jsURL = versionURL + '/' + main;
            const js = document.createElement('script');
            js.addEventListener('load', function() {
                console.log('Successfully loaded ' + jsURL + '.');
                initSafetyExplorerSuite(settings, dataArray)
            }, false);
            js.addEventListener('error', function() {
                console.log('Failed to load ' + jsURL + '.');
            }, false);
            js.src = jsURL;
            document.head.appendChild(js);

            //Load .css file.
            const cssURL = jsURL.replace('build', 'css').replace(/\.js$/, '.css');
            const css = document.createElement('link');
            css.addEventListener('load', function() {
                console.log('Successfully loaded ' + cssURL + '.');
            }, false);
            css.addEventListener('error', function() {
                console.log('Failed to load ' + cssURL + '.');
            }, false);
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = cssURL;
            document.head.appendChild(css);
        }
        pkgRequest.open(
            'get',
            versionURL + '/package.json'
        );
        pkgRequest.send();
    }
