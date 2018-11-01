(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.safetyExplorerSuite = factory());
}(this, (function () { 'use strict';

    //Simple convienence function to load multiple files in parallel.
    // input files is an array of objects structured as follows:
    // [
    // {path:'myAEs.csv', type:"AE"},
    // {path:'myLabs.csv', type:"Labs"}
    //]
    //

    function loadFiles(explorer, dataFiles, sdtm) {
        var remaining = dataFiles.length;
        dataFiles.forEach(function (file) {
            d3.csv(file.path, function (csv) {
                file.raw = csv;
                if (! --remaining) {
                    explorer.init(dataFiles, false, sdtm);
                }
            });
        });
    }

    var schema = {
        standard: 'adverse events',
        variables: [{
            name: 'USUBJID',
            type: 'string',
            label: 'Unique Subject Identifier',
            sdtm: {
                domain: 'DM',
                name: 'USUBJID'
            },
            adam: 'USUBJID'
        }, {
            name: 'SITEID',
            type: 'string',
            label: 'Study Site Identifier',
            sdtm: {
                domain: 'DM',
                name: 'SITEID'
            },
            adam: 'SITEID'
        }, {
            name: 'AGE',
            type: 'number',
            label: 'Age',
            sdtm: {
                domain: 'DM',
                name: 'AGE'
            },
            adam: 'AGE'
        }, {
            name: 'SEX',
            type: 'string',
            label: 'Sex',
            sdtm: {
                domain: 'DM',
                name: 'SEX'
            },
            adam: 'SEX'
        }, {
            name: 'RACE',
            type: 'string',
            label: 'Race',
            sdtm: {
                domain: 'DM',
                name: 'RACE'
            },
            adam: 'RACE'
        }, {
            name: 'ASTDT',
            type: 'string',
            label: 'Analysis Start Date',
            sdtm: {
                domain: 'AE',
                name: 'AESTDTC'
            },
            adam: 'ASTDT'
        }, {
            name: 'ASTDY',
            type: 'number',
            label: 'Analysis Start Relative Day',
            sdtm: {
                domain: 'AE',
                name: 'AESTDY'
            },
            adam: 'ASTDY'
        }, {
            name: 'AENDT',
            type: 'string',
            label: 'Analysis End Date',
            sdtm: {
                domain: 'AE',
                name: 'AEENDTC'
            },
            adam: 'AENDT'
        }, {
            name: 'AENDY',
            type: 'number',
            label: 'Analysis End Relative Day',
            sdtm: {
                domain: 'AE',
                name: 'AEENDY'
            },
            adam: 'AENDY'
        }, {
            name: 'AESEQ',
            type: 'number',
            label: 'Sequence Number',
            sdtm: {
                domain: 'AE',
                name: 'AESEQ'
            },
            adam: 'AESEQ'
        }, {
            name: 'AETERM',
            type: 'string',
            label: 'Reported Term for the Adverse Event',
            sdtm: {
                domain: 'AE',
                name: 'AETERM'
            },
            adam: 'AETERM'
        }, {
            name: 'AEDECOD',
            type: 'string',
            label: 'Dictionary-Derived Term',
            sdtm: {
                domain: 'AE',
                name: 'AEDECOD'
            },
            adam: 'AEDECOD'
        }, {
            name: 'AEBODSYS',
            type: 'string',
            label: 'Body System or Organ Class',
            sdtm: {
                domain: 'AE',
                name: 'AEBODSYS'
            },
            adam: 'AEBODSYS'
        }, {
            name: 'AESER',
            type: 'string',
            label: 'Serious Event',
            sdtm: {
                domain: 'AE',
                name: 'AESER'
            },
            adam: 'AESER'
        }, {
            name: 'AESEV',
            type: 'string',
            label: 'Severity/Intensity',
            sdtm: {
                domain: 'AE',
                name: 'AESEV'
            },
            adam: 'AESEV'
        }, {
            name: 'AEREL',
            type: 'string',
            label: 'Causality',
            sdtm: {
                domain: 'AE',
                name: 'AEREL'
            },
            adam: 'AEREL'
        }, {
            name: 'AEOUT',
            type: 'string',
            label: 'Outcome',
            sdtm: {
                domain: 'AE',
                name: 'AEOUT'
            },
            adam: 'AEOUT'
        }]
    };

    function adverseEvents(dm, ae) {
        //DM variables
        var dmVariables = Object.keys(dm.raw[0]);
        var dmVariableMapping = schema.variables.filter(function (variable) {
            return variable.sdtm.domain === 'DM' && variable.name !== variable.sdtm.name;
        }).map(function (variable) {
            return {
                old: variable.sdtm.name,
                new: variable.name
            };
        });

        //AE variables
        var aeVariables = Object.keys(ae.raw[0]).filter(function (key) {
            return dmVariables.indexOf(key) < 0;
        });
        var aeVariableMapping = schema.variables.filter(function (variable) {
            return variable.sdtm.domain === 'AE' && variable.name !== variable.sdtm.name;
        }).map(function (variable) {
            return {
                sdtm: variable.sdtm.name,
                name: variable.name
            };
        });
        var sdtmRenames = aeVariableMapping.map(function (mapping) {
            return mapping.sdtm;
        });

        //Create shell records for participants without adverse events.
        var withAEs = d3.set(ae.raw.map(function (d) {
            return d.USUBJID;
        })).values();
        var adae = dm.raw.filter(function (d) {
            return withAEs.indexOf(d.USUBJID) < 0;
        });

        //Create shell adverse event variables for participants without adverse events.
        adae.forEach(function (d) {
            var _loop = function _loop(aeVariable) {
                var variable = sdtmRenames.indexOf(aeVariable) > -1 ? aeVariableMapping.find(function (mapping) {
                    return mapping.sdtm === aeVariable;
                }).name : aeVariable;
                d[variable] = '';
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = aeVariables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var aeVariable = _step.value;

                    _loop(aeVariable);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });

        //Merge demographics variables onto adverse events data.
        ae.raw.forEach(function (d) {
            var datum = {};

            var _loop2 = function _loop2(aeVariable) {
                var variable = sdtmRenames.indexOf(aeVariable) > -1 ? aeVariableMapping.find(function (mapping) {
                    return mapping.sdtm === aeVariable;
                }).name : aeVariable;
                datum[variable] = d[aeVariable];
            };

            for (var aeVariable in d) {
                _loop2(aeVariable);
            }
            var dmDatum = dm.raw.find(function (di) {
                return di.USUBJID === d.USUBJID;
            });
            for (var prop in dmDatum) {
                datum[prop] = datum[prop] || dmDatum[prop];
            }adae.push(datum);
        });
        console.table(dm.raw);

        return adae;
    }

    var schema$1 = {
        standard: 'medical signs',
        variables: [{
            name: 'USUBJID',
            type: 'string',
            label: 'Unique Subject Identifier',
            sdtm: {
                domain: 'DM',
                name: 'USUBJID'
            },
            adam: 'USUBJID'
        }, {
            name: 'SITEID',
            type: 'string',
            label: 'Study Site Identifier',
            sdtm: {
                domain: 'DM',
                name: 'SITEID'
            },
            adam: 'SITEID'
        }, {
            name: 'AGE',
            type: 'number',
            label: 'Age',
            sdtm: {
                domain: 'DM',
                name: 'AGE'
            },
            adam: 'AGE'
        }, {
            name: 'SEX',
            type: 'string',
            label: 'Sex',
            sdtm: {
                domain: 'DM',
                name: 'SEX'
            },
            adam: 'SEX'
        }, {
            name: 'RACE',
            type: 'string',
            label: 'Race',
            sdtm: {
                domain: 'DM',
                name: 'RACE'
            },
            adam: 'RACE'
        }, {
            name: 'VISIT',
            type: 'string',
            label: 'Analysis Visit',
            sdtm: {
                domain: 'BDS',
                name: 'VISIT'
            },
            adam: 'AVISIT'
        }, {
            name: 'VISITNUM',
            type: 'number',
            label: 'Analysis Visit (N)',
            sdtm: {
                domain: 'BDS',
                name: 'VISITNUM'
            },
            adam: 'AVISITN'
        }, {
            name: 'DT',
            type: 'number',
            label: 'Analysis Date',
            sdtm: {
                domain: 'BDS',
                name: '__DTC'
            },
            adam: 'ADT'
        }, {
            name: 'DY',
            type: 'number',
            label: 'Analysis Relative Day',
            sdtm: {
                domain: 'BDS',
                name: '__DY'
            },
            adam: 'ADY'
        }, {
            name: 'CAT',
            type: 'string',
            label: 'Parameter Category',
            sdtm: {
                domain: 'BDS',
                name: '__CAT'
            },
            adam: 'PARCAT'
        }, {
            name: 'TEST',
            type: 'string',
            label: 'Parameter',
            sdtm: {
                domain: 'BDS',
                name: '__TEST'
            },
            adam: 'PARAM'
        }, {
            name: 'STRESU',
            type: 'string',
            label: 'Units',
            sdtm: {
                domain: 'BDS',
                name: '__STRESU'
            },
            adam: null
        }, {
            name: 'STRESN',
            type: 'number',
            label: 'Analysis Value',
            sdtm: {
                domain: 'BDS',
                name: '__STRESN'
            },
            adam: 'AVAL'
        }, {
            name: 'STNRLO',
            type: 'number',
            label: 'Analysis Normal Range Upper Limit',
            sdtm: {
                domain: 'BDS',
                name: '__STNRLO'
            },
            adam: 'ANRLO'
        }, {
            name: 'STNRHI',
            type: 'number',
            label: 'Analysis Normal Range Upper Limit',
            sdtm: {
                domain: 'BDS',
                name: '__STNRHI'
            },
            adam: 'ANRHI'
        }]
    };

    function medicalSigns(dm, bds) {
        //DM variables
        var dmVariables = Object.keys(dm.raw[0]);
        var dmVariableMapping = schema$1.variables.filter(function (variable) {
            return variable.sdtm.domain === 'DM' && variable.name !== variable.sdtm.name;
        }).map(function (variable) {
            return {
                old: variable.sdtm.name,
                new: variable.name
            };
        });

        //Create shell records for participants without medical sign results.
        var withResults = d3.set(d3.merge(bds.map(function (data) {
            return data.raw;
        })).map(function (d) {
            return d.USUBJID;
        })).values();
        var adbds = dm.raw.filter(function (d) {
            return withResults.indexOf(d.USUBJID) < 0;
        });

        //Create shell medical sign variables for participants without medical sign results.
        var bdsVariables = schema$1.variables.filter(function (variable) {
            return variable.sdtm.domain === 'BDS';
        }).map(function (variable) {
            return variable.name;
        });
        adbds.forEach(function (d) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = bdsVariables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var variable = _step.value;

                    d[variable] = '';
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });

        //Iterate over BDS data arrays.
        bds.forEach(function (data) {
            //ADBDS variables
            var bdsVariables = Object.keys(data.raw[0]).filter(function (key) {
                return dmVariables.indexOf(key) < 0;
            });
            var bdsVariableMapping = schema$1.variables.filter(function (variable) {
                return variable.sdtm.domain === 'BDS' && variable.name !== variable.sdtm.name;
            }).map(function (variable) {
                return {
                    sdtm: variable.sdtm.name.replace('__', data.domain),
                    name: variable.name
                };
            });
            var sdtmRenames = bdsVariableMapping.map(function (mapping) {
                return mapping.sdtm;
            });

            //Merge demographics variables onto medical signs data.
            var domainRegex = new RegExp('^' + data.domain);
            data.raw.forEach(function (d) {
                var datum = {};

                var _loop = function _loop(bdsVariable) {
                    var variable = sdtmRenames.indexOf(bdsVariable) > -1 ? bdsVariableMapping.find(function (mapping) {
                        return mapping.sdtm === bdsVariable;
                    }).name : bdsVariable;
                    datum[variable] = d[bdsVariable];
                };

                for (var bdsVariable in d) {
                    _loop(bdsVariable);
                }
                Object.assign(datum, dm.raw.find(function (di) {
                    return di.USUBJID === d.USUBJID;
                }));
                adbds.push(datum);
            });
        });

        return adbds;
    }

    function mergeData() {
        if (this.dataArray.some(function (data) {
            return data.type === 'AE';
        })) this.dataArray.push({
            type: 'AEs',
            'Data Standard': 'Analysis',
            raw: adverseEvents(this.dataArray.find(function (data) {
                return data.type === 'DM';
            }), this.dataArray.find(function (data) {
                return data.type === 'AE';
            }))
        });
        if (this.dataArray.some(function (data) {
            return data.type === 'BDS';
        })) this.dataArray.push({
            type: 'Labs',
            'Data Standard': 'Analysis',
            raw: medicalSigns(this.dataArray.find(function (data) {
                return data.type === 'DM';
            }), this.dataArray.filter(function (data) {
                return data.type === 'BDS';
            }))
        });
    }

    /*------------------------------------------------------------------------------------------------\
      Initialize explorer
    \------------------------------------------------------------------------------------------------*/

    function init(dataArray) {
            var loadcsv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var sdtm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (loadcsv) {
                    //load the csvs if requested
                    loadFiles(this, dataArray, sdtm);
            } else {
                    //otherwise initialize the charts
                    this.dataArray = dataArray;

                    //Merge SDTM data.
                    if (sdtm) mergeData.call(this);
                    this.data = this.dataArray;

                    // prep settings & customize renderers
                    this.prepSettings(this);

                    //create wrapper in specified div
                    this.wrap = d3.select(this.element).append('div').attr('class', 'web-codebook-explorer');

                    //layout the divs
                    this.layout(this);

                    //draw nav
                    this.nav.init(this);

                    //prep the renderers and draw first codebook
                    this.charts.init(this);
                    this.config.initial_renderer.render();
            }
    }

    /*------------------------------------------------------------------------------------------------\
      Generate HTML containers.
    \------------------------------------------------------------------------------------------------*/

    function layout() {
        if (this.config.title) this.wrap.append('h1').text(this.config.title).style('margin-bottom', '0.2em').style('margin-top', '0.2em');

        if (this.config.instructions) this.wrap.append('div').append('small').text(this.config.instructions);
        this.nav.wrap = this.wrap.append('div').attr('class', 'nav');
        this.chartWrap = this.wrap.append('div').attr('class', 'chartWrap');
    }

    function init$1(explorer) {
        explorer.nav.wrap.selectAll('*').remove();

        var chartNav = explorer.nav.wrap.append('ul').attr('class', 'ses-nav ses-nav-tabs');

        var chartNavItems = chartNav.selectAll('li').data(explorer.charts.renderers).enter().append('li').classed('active', function (d, i) {
            return d.name === explorer.config.initial_renderer.name;
        });

        chartNavItems.append('a').text(function (d) {
            return d.label;
        });

        chartNavItems.on('click', function (d) {
            if (!d3.select(this).classed('active')) {
                explorer.chartWrap.selectAll('*').remove();
                chartNavItems.classed('active', false);
                d3.select(this).classed('active', true);
                d.render();
            }
        });
    }

    /*------------------------------------------------------------------------------------------------\
      Define controls object.
    \------------------------------------------------------------------------------------------------*/

    var nav = {
      init: init$1
    };

    var renderers = [{
        name: 'aeexplorer',
        label: 'AE Explorer',
        main: 'aeTable',
        sub: 'createChart',
        css: 'css/aeTable.css',
        data: 'AEs',
        settings: {}
    }, {
        name: 'ae-timelines',
        label: 'AE Timeline',
        main: 'aeTimelines',
        sub: null,
        css: null,
        data: 'AEs',
        settings: {}
    }, {
        name: 'safety-histogram',
        label: 'Histogram',
        main: 'safetyHistogram',
        sub: null,
        css: null,
        data: 'Labs',
        settings: {}
    }, {
        name: 'safety-outlier-explorer',
        label: 'Outlier Explorer',
        main: 'safetyOutlierExplorer',
        sub: null,
        css: null,
        data: 'Labs',
        settings: {}
    }, {
        name: 'paneled-outlier-explorer',
        label: 'Paneled Outlier Explorer',
        main: 'paneledOutlierExplorer',
        sub: null,
        css: null,
        data: 'Labs',
        settings: {}
    }, {
        name: 'safety-results-over-time',
        label: 'Results Over Time',
        main: 'safetyResultsOverTime',
        sub: null,
        css: null,
        data: 'Labs',
        settings: {}
    }, {
        name: 'safety-shift-plot',
        label: 'Shift Plot',
        main: 'safetyShiftPlot',
        sub: null,
        css: null,
        data: 'Labs',
        settings: {}
    }, {
        name: 'web-codebook',
        label: 'Codebooks',
        main: 'webcodebook',
        sub: 'createExplorer',
        css: 'css/webcodebook.css',
        data: null,
        settings: {
            labelColumn: 'type',
            ignoredColumns: ['raw', 'fileFound', 'key', 'domain'],
            files: null
        }
    }];

    function init$2(explorer) {
        explorer.charts.renderers.forEach(function (renderer) {
            //link the data
            if (renderer.name == 'web-codebook') {
                renderer.settings.files = explorer.data.map(function (d) {
                    d['Data'] = d.type;
                    d.Rows = d.raw.length;
                    d.Columns = Object.keys(d.raw[0]).length;
                    d.json = d.raw;
                    return d;
                });
                renderer.dataFile = null;
            } else {
                renderer.dataFile = explorer.data.filter(function (d) {
                    return d.type == renderer.data;
                })[0];
            }

            //add render method
            //     var mainFunction = cat.controls.mainFunction.node().value;
            renderer.render = function () {
                if (renderer.sub) {
                    //var subFunction = cat.controls.subFunction.node().value;
                    var myChart = window[renderer.main][renderer.sub](explorer.element + ' .chartWrap', renderer.settings);
                } else {
                    var myChart = window[renderer.main](explorer.element + ' .chartWrap', renderer.settings);
                }

                if (renderer.dataFile) {
                    myChart.init(renderer.dataFile.raw);
                } else {
                    myChart.init();
                }
            };

            //add destroy method
            renderer.destroy = function () {};
        });
    }

    /*------------------------------------------------------------------------------------------------\
      Define controls object.
    \------------------------------------------------------------------------------------------------*/

    var charts = {
        renderers: renderers,
        init: init$2
    };

    var defaultSettings = {
        renderers: null,
        initial_renderer: 'aeexplorer',
        custom_settings: null,
        title: null,
        instructions: null
    };

    function prepSettings(explorer) {
        //set defaults and update the renderers accordingly
        explorer.config.renderers = explorer.config.renderers || explorer.charts.renderers.map(function (renderer) {
            return renderer.name;
        });
        explorer.config.custom_settings = explorer.config.custom_settings || defaultSettings.custom_settings;

        //only keep the selected renderers (or keep them all if none are specified)
        explorer.charts.renderers = explorer.charts.renderers.filter(function (d) {
            return explorer.config.renderers.indexOf(d.name) > -1;
        }).sort(function (a, b) {
            return explorer.config.renderers.indexOf(a.name) - explorer.config.renderers.indexOf(b.name);
        });

        //set initial renderer
        explorer.config.initial_renderer = explorer.charts.renderers.find(function (renderer) {
            return renderer.name === explorer.config.initial_renderer;
        }) || explorer.charts.renderers[0];

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
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
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

})));
