(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.safetyExplorerSuite = factory());
})(this, function() {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
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
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    //Simple convienence function to load multiple files in parallel.
    // input files is an array of objects structured as follows:
    // [
    // {path:'myAEs.csv', type:"AE"},
    // {path:'myLabs.csv', type:"Labs"}
    //]
    //

    function loadFiles(explorer, dataFiles, sdtm) {
        var remaining = dataFiles.length;
        dataFiles.forEach(function(file) {
            d3.csv(file.path, function(csv) {
                file.raw = csv;
                if (!--remaining) {
                    explorer.init(dataFiles, false, sdtm);
                }
            });
        });
    }

    function loadSettings(explorer) {
        //parse the settings object to get the path
        var location = explorer.config.chartSettings.location.path
            ? explorer.config.chartSettings.location.path +
              explorer.config.chartSettings.location.file +
              '.json'
            : 'library';

        //load the settings object
        if (location == 'library') {
            explorer.config.chartSettings.imported =
                explorer.settingsLibrary[explorer.config.chartSettings.location.file];
            explorer.config.chartSettings.load = false;
            explorer.charts.init(explorer);
            explorer.charts.renderers[0].render();
        } else {
            d3.json(location, function(error, json) {
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

    var schema = {
        standard: 'adverse events',
        variables: [
            {
                name: 'USUBJID',
                type: 'string',
                label: 'Unique Subject Identifier',
                sdtm: {
                    domain: 'DM',
                    name: 'USUBJID'
                },
                adam: 'USUBJID'
            },
            {
                name: 'SITEID',
                type: 'string',
                label: 'Study Site Identifier',
                sdtm: {
                    domain: 'DM',
                    name: 'SITEID'
                },
                adam: 'SITEID'
            },
            {
                name: 'AGE',
                type: 'number',
                label: 'Age',
                sdtm: {
                    domain: 'DM',
                    name: 'AGE'
                },
                adam: 'AGE'
            },
            {
                name: 'SEX',
                type: 'string',
                label: 'Sex',
                sdtm: {
                    domain: 'DM',
                    name: 'SEX'
                },
                adam: 'SEX'
            },
            {
                name: 'RACE',
                type: 'string',
                label: 'Race',
                sdtm: {
                    domain: 'DM',
                    name: 'RACE'
                },
                adam: 'RACE'
            },
            {
                name: 'ASTDT',
                type: 'string',
                label: 'Analysis Start Date',
                sdtm: {
                    domain: 'AE',
                    name: 'AESTDTC'
                },
                adam: 'ASTDT'
            },
            {
                name: 'ASTDY',
                type: 'number',
                label: 'Analysis Start Relative Day',
                sdtm: {
                    domain: 'AE',
                    name: 'AESTDY'
                },
                adam: 'ASTDY'
            },
            {
                name: 'AENDT',
                type: 'string',
                label: 'Analysis End Date',
                sdtm: {
                    domain: 'AE',
                    name: 'AEENDTC'
                },
                adam: 'AENDT'
            },
            {
                name: 'AENDY',
                type: 'number',
                label: 'Analysis End Relative Day',
                sdtm: {
                    domain: 'AE',
                    name: 'AEENDY'
                },
                adam: 'AENDY'
            },
            {
                name: 'AESEQ',
                type: 'number',
                label: 'Sequence Number',
                sdtm: {
                    domain: 'AE',
                    name: 'AESEQ'
                },
                adam: 'AESEQ'
            },
            {
                name: 'AETERM',
                type: 'string',
                label: 'Reported Term for the Adverse Event',
                sdtm: {
                    domain: 'AE',
                    name: 'AETERM'
                },
                adam: 'AETERM'
            },
            {
                name: 'AEDECOD',
                type: 'string',
                label: 'Dictionary-Derived Term',
                sdtm: {
                    domain: 'AE',
                    name: 'AEDECOD'
                },
                adam: 'AEDECOD'
            },
            {
                name: 'AEBODSYS',
                type: 'string',
                label: 'Body System or Organ Class',
                sdtm: {
                    domain: 'AE',
                    name: 'AEBODSYS'
                },
                adam: 'AEBODSYS'
            },
            {
                name: 'AESER',
                type: 'string',
                label: 'Serious Event',
                sdtm: {
                    domain: 'AE',
                    name: 'AESER'
                },
                adam: 'AESER'
            },
            {
                name: 'AESEV',
                type: 'string',
                label: 'Severity/Intensity',
                sdtm: {
                    domain: 'AE',
                    name: 'AESEV'
                },
                adam: 'AESEV'
            },
            {
                name: 'AEREL',
                type: 'string',
                label: 'Causality',
                sdtm: {
                    domain: 'AE',
                    name: 'AEREL'
                },
                adam: 'AEREL'
            },
            {
                name: 'AEOUT',
                type: 'string',
                label: 'Outcome',
                sdtm: {
                    domain: 'AE',
                    name: 'AEOUT'
                },
                adam: 'AEOUT'
            }
        ]
    };

    function adverseEvents(dm, ae) {
        var _this = this;

        //DM variables
        var dmVariables = Object.keys(dm.raw[0]);
        var dmVariableMapping = schema.variables
            .filter(function(variable) {
                return variable.sdtm.domain === 'DM' && variable.name !== variable.sdtm.name;
            })
            .map(function(variable) {
                return {
                    old: variable.sdtm.name,
                    new: variable.name
                };
            });

        //AE variables
        var aeVariables = Object.keys(ae.raw[0]).filter(function(key) {
            return dmVariables.indexOf(key) < 0;
        });
        var aeVariableMapping = schema.variables
            .filter(function(variable) {
                return variable.sdtm.domain === 'AE' && variable.name !== variable.sdtm.name;
            })
            .map(function(variable) {
                return {
                    sdtm: variable.sdtm.name,
                    name: variable.name
                };
            });
        var sdtmRenames = aeVariableMapping.map(function(mapping) {
            return mapping.sdtm;
        });

        //Create shell records for participants without adverse events.
        var withAEs = d3
            .set(
                ae.raw.map(function(d) {
                    return d.USUBJID;
                })
            )
            .values();
        var adae = this.clone(
            dm.raw.filter(function(d) {
                return withAEs.indexOf(d.USUBJID) < 0;
            })
        );

        //Create shell adverse event variables for participants without adverse events.
        adae.forEach(function(d) {
            aeVariables.forEach(function(aeVariable) {
                var variable =
                    sdtmRenames.indexOf(aeVariable) > -1
                        ? aeVariableMapping.find(function(mapping) {
                              return mapping.sdtm === aeVariable;
                          }).name
                        : aeVariable;
                d[variable] = '';
            });
        });

        //Merge demographics variables onto adverse events data.
        ae.raw.forEach(function(d) {
            var datum = {};

            var _loop = function _loop(aeVariable) {
                var variable =
                    sdtmRenames.indexOf(aeVariable) > -1
                        ? aeVariableMapping.find(function(mapping) {
                              return mapping.sdtm === aeVariable;
                          }).name
                        : aeVariable;
                datum[variable] = d[aeVariable];
            };

            for (var aeVariable in d) {
                _loop(aeVariable);
            }
            var dmDatum = _this.clone(
                dm.raw.find(function(di) {
                    return di.USUBJID === d.USUBJID;
                })
            );
            for (var prop in dmDatum) {
                datum[prop] = datum[prop] || dmDatum[prop];
            }
            adae.push(datum);
        });

        return adae;
    }

    var schema$1 = {
        standard: 'medical signs',
        variables: [
            {
                name: 'USUBJID',
                type: 'string',
                label: 'Unique Subject Identifier',
                sdtm: {
                    domain: 'DM',
                    name: 'USUBJID'
                },
                adam: 'USUBJID'
            },
            {
                name: 'SITEID',
                type: 'string',
                label: 'Study Site Identifier',
                sdtm: {
                    domain: 'DM',
                    name: 'SITEID'
                },
                adam: 'SITEID'
            },
            {
                name: 'AGE',
                type: 'number',
                label: 'Age',
                sdtm: {
                    domain: 'DM',
                    name: 'AGE'
                },
                adam: 'AGE'
            },
            {
                name: 'SEX',
                type: 'string',
                label: 'Sex',
                sdtm: {
                    domain: 'DM',
                    name: 'SEX'
                },
                adam: 'SEX'
            },
            {
                name: 'RACE',
                type: 'string',
                label: 'Race',
                sdtm: {
                    domain: 'DM',
                    name: 'RACE'
                },
                adam: 'RACE'
            },
            {
                name: 'VISIT',
                type: 'string',
                label: 'Analysis Visit',
                sdtm: {
                    domain: 'BDS',
                    name: 'VISIT'
                },
                adam: 'AVISIT'
            },
            {
                name: 'VISITNUM',
                type: 'number',
                label: 'Analysis Visit (N)',
                sdtm: {
                    domain: 'BDS',
                    name: 'VISITNUM'
                },
                adam: 'AVISITN'
            },
            {
                name: 'DT',
                type: 'number',
                label: 'Analysis Date',
                sdtm: {
                    domain: 'BDS',
                    name: '__DTC'
                },
                adam: 'ADT'
            },
            {
                name: 'DY',
                type: 'number',
                label: 'Analysis Relative Day',
                sdtm: {
                    domain: 'BDS',
                    name: '__DY'
                },
                adam: 'ADY'
            },
            {
                name: 'CAT',
                type: 'string',
                label: 'Parameter Category',
                sdtm: {
                    domain: 'BDS',
                    name: '__CAT'
                },
                adam: 'PARCAT'
            },
            {
                name: 'TEST',
                type: 'string',
                label: 'Parameter',
                sdtm: {
                    domain: 'BDS',
                    name: '__TEST'
                },
                adam: 'PARAM'
            },
            {
                name: 'STRESU',
                type: 'string',
                label: 'Units',
                sdtm: {
                    domain: 'BDS',
                    name: '__STRESU'
                },
                adam: null
            },
            {
                name: 'STRESN',
                type: 'number',
                label: 'Analysis Value',
                sdtm: {
                    domain: 'BDS',
                    name: '__STRESN'
                },
                adam: 'AVAL'
            },
            {
                name: 'STNRLO',
                type: 'number',
                label: 'Analysis Normal Range Upper Limit',
                sdtm: {
                    domain: 'BDS',
                    name: '__STNRLO'
                },
                adam: 'ANRLO'
            },
            {
                name: 'STNRHI',
                type: 'number',
                label: 'Analysis Normal Range Upper Limit',
                sdtm: {
                    domain: 'BDS',
                    name: '__STNRHI'
                },
                adam: 'ANRHI'
            }
        ]
    };

    function medicalSigns(dm, bds) {
        var _this = this;

        //DM variables
        var dmVariables = Object.keys(dm.raw[0]);
        var dmVariableMapping = schema$1.variables
            .filter(function(variable) {
                return variable.sdtm.domain === 'DM' && variable.name !== variable.sdtm.name;
            })
            .map(function(variable) {
                return {
                    old: variable.sdtm.name,
                    new: variable.name
                };
            });

        //Create shell records for participants without medical sign results.
        var withResults = d3
            .set(
                d3
                    .merge(
                        bds.map(function(data) {
                            return data.raw;
                        })
                    )
                    .map(function(d) {
                        return d.USUBJID;
                    })
            )
            .values();
        var adbds = this.clone(
            dm.raw.filter(function(d) {
                return withResults.indexOf(d.USUBJID) < 0;
            })
        );

        //Create shell medical sign variables for participants without medical sign results.
        var schemaVariables = schema$1.variables
            .filter(function(variable) {
                return variable.sdtm.domain === 'BDS';
            })
            .map(function(variable) {
                return variable.name;
            });
        adbds.forEach(function(d) {
            schemaVariables.forEach(function(variable) {
                d[variable] = '';
            });
        });

        //Iterate over BDS data arrays.
        bds.forEach(function(data) {
            //ADBDS variables
            var bdsVariables = Object.keys(data.raw[0]).filter(function(key) {
                return dmVariables.indexOf(key) < 0;
            });

            //If domain is not defined find most common two-character variable prefix, as the SDTM data standard prefixes variables with the two-character domain code.
            data.domain =
                data.domain ||
                d3
                    .nest()
                    .key(function(d) {
                        return d;
                    })
                    .rollup(function(d) {
                        return d.length;
                    })
                    .entries(
                        bdsVariables.map(function(variable) {
                            return variable.substring(0, 2);
                        })
                    )
                    .sort(function(a, b) {
                        return b.values - a.values;
                    })[0].key;

            //Capture variable mappings from schema with which to rename domain-specific variables.
            var bdsVariableMapping = schema$1.variables
                .filter(function(variable) {
                    return variable.sdtm.domain === 'BDS' && variable.name !== variable.sdtm.name;
                })
                .map(function(variable) {
                    return {
                        sdtm: variable.sdtm.name.replace('__', data.domain),
                        name: variable.name
                    };
                });
            var sdtmRenames = bdsVariableMapping.map(function(mapping) {
                return mapping.sdtm;
            });

            //Merge demographics variables onto medical signs data.
            var domainRegex = new RegExp('^' + data.domain);
            data.raw.forEach(function(d, i) {
                var datum = {};

                var _loop = function _loop(bdsVariable) {
                    var variable =
                        sdtmRenames.indexOf(bdsVariable) > -1
                            ? bdsVariableMapping.find(function(mapping) {
                                  return mapping.sdtm === bdsVariable;
                              }).name
                            : bdsVariable;
                    datum[variable] = d[bdsVariable];
                };

                for (var bdsVariable in d) {
                    _loop(bdsVariable);
                }
                Object.assign(
                    datum,
                    _this.clone(
                        dm.raw.find(function(di) {
                            return di.USUBJID === d.USUBJID;
                        })
                    )
                );
                adbds.push(datum);
            });
        });

        return adbds;
    }

    function mergeData() {
        if (
            this.dataArray.some(function(data) {
                return data.type === 'AE';
            })
        )
            this.dataArray.push({
                type: 'AEs',
                'Data Standard': 'Analysis',
                raw: adverseEvents.call(
                    this,
                    this.dataArray.find(function(data) {
                        return data.type === 'DM';
                    }),
                    this.dataArray.find(function(data) {
                        return data.type === 'AE';
                    })
                )
            });
        if (
            this.dataArray.some(function(data) {
                return data.type === 'BDS';
            })
        )
            this.dataArray.push({
                type: 'Labs',
                'Data Standard': 'Analysis',
                raw: medicalSigns.call(
                    this,
                    this.dataArray.find(function(data) {
                        return data.type === 'DM';
                    }),
                    this.dataArray.filter(function(data) {
                        return data.type === 'BDS';
                    })
                )
            });
    }

    function init(dataArray) {
        var loadcsv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var sdtm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (loadcsv) loadFiles(this, dataArray, sdtm);
        // load the csvs if requested
        else {
            //otherwise initialize the charts
            this.dataArray = dataArray;

            //Merge SDTM data.
            if (sdtm) mergeData.call(this);
            this.data = this.dataArray;

            //Initialize data customizations callback
            this.events.onDatatransform.call(this);

            // prep settings & customize renderers
            this.prepSettings(this);

            //create wrapper in specified div
            this.wrap = d3
                .select(this.element)
                .append('div')
                .attr('class', 'safety-explorer');

            //layout the divs
            this.layout(this);

            //draw nav
            this.nav.init(this);

            //load chart settings (if needed) and then prep the renderers and draw first codebook
            if (this.config.chartSettings.load) loadSettings(this);
            else {
                this.charts.init(this);
                this.config.initial_renderer.render();
            }
        }
    }

    /*------------------------------------------------------------------------------------------------\
      Generate HTML containers.
    \------------------------------------------------------------------------------------------------*/

    function layout() {
        if (this.config.title)
            this.wrap
                .append('h1')
                .text(this.config.title)
                .style('margin-bottom', '0.2em')
                .style('margin-top', '0.2em');

        if (this.config.instructions)
            this.wrap
                .append('div')
                .append('small')
                .text(this.config.instructions);
        this.nav.wrap = this.wrap.append('div').attr('class', 'nav');
        this.chartWrap = this.wrap.append('div').attr('class', 'chartWrap');
    }

    function init$1(explorer) {
        explorer.nav.wrap.selectAll('*').remove();

        var chartNav = explorer.nav.wrap.append('ul').attr('class', 'ses-nav ses-nav-tabs');

        var chartNavItems = chartNav
            .selectAll('li')
            .data(explorer.charts.renderers)
            .enter()
            .append('li')
            .classed('active', function(d, i) {
                return d.name === explorer.config.initial_renderer.name;
            });

        chartNavItems.append('a').text(function(d) {
            return d.label;
        });

        chartNavItems.on('click', function(d) {
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

    var renderers = [
        {
            name: 'aeexplorer',
            label: 'AE Explorer',
            main: 'aeTable',
            sub: 'createChart',
            css: 'css/aeTable.css',
            data: 'AEs',
            settings: {}
        },
        {
            name: 'ae-timelines',
            label: 'AE Timeline',
            main: 'aeTimelines',
            sub: null,
            css: null,
            data: 'AEs',
            settings: {}
        },
        {
            name: 'safety-histogram',
            label: 'Histogram',
            main: 'safetyHistogram',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
            name: 'safety-outlier-explorer',
            label: 'Outlier Explorer',
            main: 'safetyOutlierExplorer',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
            name: 'paneled-outlier-explorer',
            label: 'Paneled Outlier Explorer',
            main: 'paneledOutlierExplorer',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
            name: 'safety-results-over-time',
            label: 'Results Over Time',
            main: 'safetyResultsOverTime',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
            name: 'safety-shift-plot',
            label: 'Shift Plot',
            main: 'safetyShiftPlot',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
            name: 'hep-explorer',
            label: 'Hepatotoxicity Explorer',
            main: 'hepexplorer',
            sub: null,
            css: null,
            data: 'Labs',
            settings: {}
        },
        {
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
        }
    ];

    // Set renderers.settings using the following (in order or preference):
    // chartSettings.custom
    // chartSettings.imported
    // renderer.settings

    function prepSettings(explorer) {
        explorer.charts.renderers.forEach(function(renderer) {
            var customMatch = explorer.config.chartSettings.custom
                ? explorer.config.chartSettings.custom.filter(function(f) {
                      return f.renderer_name == renderer.name;
                  })
                : [];
            var importedMatch = explorer.config.chartSettings.imported
                ? explorer.config.chartSettings.imported.filter(function(f) {
                      return f.renderer_name == renderer.name;
                  })
                : [];

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
        explorer.charts.renderers.forEach(function(renderer) {
            //link the data
            if (renderer.name == 'web-codebook') {
                renderer.settings.files = explorer.data.map(function(d) {
                    d['Data'] = d.type;
                    d.Rows = d.raw.length;
                    d.Columns = Object.keys(d.raw[0]).length;
                    d.json = d.raw;
                    return d;
                });
                renderer.dataFile = null;
            } else {
                renderer.dataFile = explorer.data.filter(function(d) {
                    return d.type == renderer.data;
                })[0];
            }

            //add render method
            //     var mainFunction = cat.controls.mainFunction.node().value;
            renderer.render = function() {
                if (renderer.sub) {
                    //var subFunction = cat.controls.subFunction.node().value;
                    explorer.currentChart = window[renderer.main][renderer.sub](
                        explorer.element + ' .chartWrap',
                        renderer.settings
                    );
                } else {
                    explorer.currentChart = window[renderer.main](
                        explorer.element + ' .chartWrap',
                        renderer.settings
                    );
                }
                explorer.currentChart.key = renderer.name;
                explorer.currentChart.renderer = renderer;

                if (renderer.dataFile) {
                    explorer.currentChart.init(
                        renderer.dataFile.raw.map(function(d) {
                            return Object.assign({}, d);
                        })
                    );
                } else {
                    explorer.currentChart.init();
                }

                //call the chartinit callback
                explorer.events.onChartinit.call(explorer);
            };

            //add destroy method
            renderer.destroy = function() {};
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
        settings_path: null,
        settings: null,
        initial_renderer: 'aeexplorer',
        custom_settings: null,
        title: null,
        instructions: null,
        chartSettings: {
            custom: null,
            location: {}
        }
    };

    function prepSettings$1(explorer) {
        //set defaults and update the renderers accordingly
        explorer.config.renderers =
            explorer.config.renderers ||
            explorer.charts.renderers.map(function(renderer) {
                return renderer.name;
            });
        explorer.config.custom_settings =
            explorer.config.custom_settings || defaultSettings.custom_settings;

        //only keep the selected renderers (or keep them all if none are specified)
        explorer.charts.renderers = explorer.charts.renderers
            .filter(function(d) {
                return explorer.config.renderers.indexOf(d.name) > -1;
            })
            .sort(function(a, b) {
                return (
                    explorer.config.renderers.indexOf(a.name) -
                    explorer.config.renderers.indexOf(b.name)
                );
            });

        //chartSettings object
        explorer.config.chartSettings =
            explorer.config.chartSettings || defaultSettings.chartSettings;

        //Map deprecated custom_settings object to config.chartSettings.custom (if no other settings are provided)
        //if (explorer.config.custom_settings.length & !explorer.config.chartSettings.custom) {
        //    explorer.config.chartSettings.custom = explorer.config.custom_settings;
        //}

        //Attempt to load the settings if a file is specified
        explorer.config.chartSettings.load = explorer.config.chartSettings.location.file
            ? true
            : false;

        //set initial renderer
        explorer.config.initial_renderer =
            explorer.charts.renderers.find(function(renderer) {
                return renderer.name === explorer.config.initial_renderer;
            }) || explorer.charts.renderers[0];

        //customize the settings (or use the default settings if nothing is specified)
        if (explorer.config.custom_settings) {
            explorer.config.custom_settings.forEach(function(custom_setting) {
                var thisRenderer = explorer.charts.renderers.filter(function(renderer) {
                    return custom_setting.renderer_name == renderer.name;
                })[0];

                if (thisRenderer) thisRenderer.settings = custom_setting;
            });
        }

        //Title and instructions
        explorer.config.title = explorer.config.title || defaultSettings.title;
        explorer.config.instructions = explorer.config.instructions || defaultSettings.instructions;
    }

    var safetyExplorerDefault = [
        ////////////////////////////////////////////////////
        // 1 - AE Explorer Settings
        ////////////////////////////////////////////////////
        {
            renderer_name: 'aeexplorer',
            variables: {
                id: 'USUBJID',
                major: 'AEBODSYS',
                minor: 'AEDECOD',
                group: 'SEX',
                details: [
                    'USUBJID',
                    'SITEID',
                    'SEX',
                    'RACE',
                    'AESTDTC',
                    'AESTDY',
                    'AEENDTC',
                    'AEENDY',
                    'AETERM',
                    'AEDECOD',
                    'AEBODSYS',
                    'AESER',
                    'AESEV',
                    'AEREL',
                    'AEOUT'
                ]
            },
            filters: [
                {
                    value_col: 'AESER',
                    label: 'Serious?'
                },
                {
                    value_col: 'AESEV',
                    label: 'Severity'
                },
                {
                    value_col: 'AEREL',
                    label: 'Relationship'
                },
                {
                    value_col: 'AEOUT',
                    label: 'Outcome'
                }
            ],
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
            renderer_name: 'ae-timelines',
            stdy_col: 'AESTDY',
            endy_col: 'AEENDY',
            filters: [
                { value_col: 'AESEV', label: 'Severity/Intensity' },
                { value_col: 'USUBJID', label: 'Subject Identifier' },
                { value_col: 'SITEID', label: 'Site ID' },
                { value_col: 'AEBODSYS', label: 'Body System' },
                { value_col: 'AEDECOD', label: 'Preferred Term' }
            ],
            color: {
                value_col: 'AESEV',
                label: 'Severity/Intensity',
                values: ['MILD', 'MODERATE', 'SEVERE', 'NA'],
                colors: [
                    '#66bd63', // green
                    '#fdae61', // sherbet
                    '#d73027', // red
                    'gray'
                ]
            }
        },
        ////////////////////////////////////////////////////
        // 3 - Safety outlier explorer
        ////////////////////////////////////////////////////
        {
            renderer_name: 'safety-outlier-explorer',
            time_cols: [
                {
                    value_col: 'DY',
                    type: 'linear',
                    label: 'Study Day',
                    rotate_tick_labels: false,
                    vertical_space: 0
                },
                {
                    value_col: 'VISTPTN',
                    type: 'ordinal',
                    label: 'Visit Number',
                    rotate_tick_labels: false,
                    vertical_space: 0
                },
                {
                    value_col: 'VISTPT',
                    type: 'ordinal',
                    label: 'Visit',
                    rotate_tick_labels: true,
                    vertical_space: 100 // Specify vertical space for rotated tick labels.  Maps to [margin.bottom].
                }
            ],
            filters: [
                { value_col: 'SITEID', label: 'Site' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' }
            ]
        },
        ////////////////////////////////////////////////////
        // 4 - Paneled outlier explorer
        ////////////////////////////////////////////////////
        {
            renderer_name: 'paneled-outlier-explorer',
            time_cols: [
                {
                    value_col: 'DY',
                    type: 'linear',
                    label: 'Study Day',
                    rotate_tick_labels: false,
                    vertical_space: 0
                },
                {
                    value_col: 'VISTPTN',
                    type: 'ordinal',
                    label: 'Visit Number',
                    rotate_tick_labels: false,
                    vertical_space: 0
                },
                {
                    value_col: 'VISTPT',
                    type: 'ordinal',
                    label: 'Visit',
                    rotate_tick_labels: true,
                    vertical_space: 100
                }
            ],
            filters: [
                { value_col: 'USUBJID', label: 'Subject ID' },
                { value_col: 'SITEID', label: 'Site' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' }
            ]
        },
        ////////////////////////////////////////////////////
        // 5 - Histogram
        ////////////////////////////////////////////////////
        {
            renderer_name: 'safety-histogram',
            filters: [
                { value_col: 'SITEID', label: 'Site' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' },
                { value_col: 'VISTPT', label: 'Visit' }
            ]
        },
        ////////////////////////////////////////////////////
        // 6 - Results over time Settings
        ////////////////////////////////////////////////////
        {
            renderer_name: 'safety-results-over-time',
            time_settings: {
                value_col: 'VISTPT',
                label: 'Visit',
                order: null, // x-axis domain order (array)
                rotate_tick_labels: false,
                vertical_space: 100
            },
            x: {
                column: null, // set in syncSettings()
                type: 'ordinal',
                label: null,
                behavior: 'raw',
                sort: 'alphabetical-ascending',
                tickAttr: null
            },
            groups: [
                { value_col: 'NONE', label: 'None' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' }
            ],
            filters: [
                { value_col: 'SITEID', label: 'Site' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' }
            ]
        },
        ////////////////////////////////////////////////////
        // 7 - Shift PLot Settings
        ////////////////////////////////////////////////////
        {
            renderer_name: 'safety-shift-plot',
            time_col: 'VISTPT',
            x_params: { visits: ['Screening'], stat: 'mean' },
            filters: [
                { value_col: 'SITEID', label: 'Site' },
                { value_col: 'SEX', label: 'Sex' },
                { value_col: 'RACE', label: 'Race' },
                { value_col: 'AGEGROUP', label: 'Age Group' }
            ],
            resizable: true,
            max_width: 600
        }
    ];

    /*------------------------------------------------------------------------------------------------\
      Define controls object.
    \------------------------------------------------------------------------------------------------*/

    var settingsLibrary = {
        safetyExplorerDefault: safetyExplorerDefault
    };

    function createExplorer() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var config = arguments[1];

        var explorer = {
            clone: clone,
            element: element,
            config: config,
            init: init,
            layout: layout,
            nav: nav,
            loadFiles: loadFiles,
            prepSettings: prepSettings$1,
            charts: charts,
            settingsLibrary: settingsLibrary,
            events: {
                onDatatransform: function onDatatransform() {},
                onChartconfig: function onChartconfig() {},
                onChartinit: function onChartinit() {}
            },
            on: function on(event, callback) {
                console.log('making event: ' + event);
                var possible_events = ['datatransform', 'chartconfig', 'chartinit'];

                if (possible_events.indexOf(event) < 0) return;

                if (callback) {
                    console.log('saving the event ... ');
                    explorer.events[
                        'on' + (event.charAt(0).toUpperCase() + event.slice(1))
                    ] = callback;
                }
            }
        };

        return explorer;
    }

    var index = {
        createExplorer: createExplorer
    };

    return index;
});
