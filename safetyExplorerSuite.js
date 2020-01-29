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

    var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        } else {
            return Array.from(arr);
        }
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
    // {path:'myAEs.csv', spec:"AE"},
    // {path:'myLabs.csv', spec:"BDS"}
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

    var ae = {
        spec: 'ae',
        variables: [
            {
                name: 'AEACN',
                label: 'Action Taken with Study Treatment',
                type: 'string'
            },
            {
                name: 'AEACNOTH',
                label: 'Other Action Taken',
                type: 'string'
            },
            {
                name: 'AEBODSYS',
                label: 'Body System or Organ Class',
                type: 'string'
            },
            {
                name: 'AECAT',
                label: 'Category for Adverse Event',
                type: 'string'
            },
            {
                name: 'AECONTRT',
                label: 'Concomitant or Additional Trtmnt Given',
                type: 'string'
            },
            {
                name: 'AEDECOD',
                label: 'Dictionary-Derived Term',
                type: 'string'
            },
            {
                name: 'AEDUR',
                label: 'Duration of Adverse Event ',
                type: 'string'
            },
            {
                name: 'AEENDTC ',
                label: 'End Date/Time of Adverse Event',
                type: 'string'
            },
            {
                name: 'AEENDY',
                label: 'Study Day of End of Adverse Event',
                type: 'number'
            },
            {
                name: 'AEENRF',
                label: 'End Relative to Reference Period',
                type: 'string'
            },
            {
                name: 'AEGRPID',
                label: 'Group ID',
                type: 'string'
            },
            {
                name: 'AELOC',
                label: 'Location of the Reaction',
                type: 'string'
            },
            {
                name: 'AEMODIFY',
                label: 'Modified Reported Term',
                type: 'string'
            },
            {
                name: 'AEOCCUR',
                label: 'Adverse Event Occurrence',
                type: 'string'
            },
            {
                name: 'AEOUT',
                label: 'Outcome of Adverse Event',
                type: 'string'
            },
            {
                name: 'AEPATT',
                label: 'Pattern of Adverse Event',
                type: 'string'
            },
            {
                name: 'AEREFID',
                label: 'Reference ID',
                type: 'string'
            },
            {
                name: 'AEREL',
                label: 'Causality',
                type: 'string'
            },
            {
                name: 'AERELNST',
                label: 'Relationship to Non-Study Treatment',
                type: 'string'
            },
            {
                name: 'AESCAN',
                label: 'Involves Cancer',
                type: 'string'
            },
            {
                name: 'AESCAT',
                label: 'Subcategory for Adverse Event',
                type: 'string'
            },
            {
                name: 'AESCONG',
                label: 'Congenital Anomaly or Birth Defect',
                type: 'string'
            },
            {
                name: 'AESDISAB',
                label: 'Persist or Signif Disability/Incapacity',
                type: 'string'
            },
            {
                name: 'AESDTH',
                label: 'Results in Death',
                type: 'string'
            },
            {
                name: 'AESEQ',
                label: 'Sequence Number',
                type: 'number'
            },
            {
                name: 'AESER',
                label: 'Serious Event',
                type: 'string'
            },
            {
                name: 'AESEV',
                label: 'Severity/Intensity',
                type: 'string'
            },
            {
                name: 'AESHOSP',
                label: 'Requires or Prolongs Hospitalization',
                type: 'string'
            },
            {
                name: 'AESLIFE',
                label: 'Is Life Threatening',
                type: 'string'
            },
            {
                name: 'AESMIE',
                label: 'Other Medically Important Serious Event',
                type: 'string'
            },
            {
                name: 'AESOD',
                label: 'Occurred with Overdose',
                type: 'string'
            },
            {
                name: 'AESPID',
                label: 'Sponsor-Defined Identifier',
                type: 'string'
            },
            {
                name: 'AESTDTC',
                label: 'Start Date/Time of Adverse Event',
                type: 'string'
            },
            {
                name: 'AESTDY',
                label: 'Study Day of Start of Adverse Event',
                type: 'number'
            },
            {
                name: 'AETERM',
                label: 'Reported Term for the Adverse Event',
                type: 'string'
            },
            {
                name: 'AETOXGR',
                label: 'Standard Toxicity Grade',
                type: 'string'
            },
            {
                name: 'DOMAIN',
                label: 'Domain Abbreviation',
                type: 'string'
            },
            {
                name: 'STUDYID',
                label: 'Study Identifier',
                type: 'string'
            },
            {
                name: 'USUBJID',
                label: 'Unique Subject Identifier',
                type: 'string'
            }
        ]
    };

    var bds = {
        spec: 'bds',
        variables: [
            {
                name: 'BLFL',
                type: 'string',
                label: 'Baseline Flag'
            },
            {
                name: 'CAT',
                type: 'string',
                label: 'Category'
            },
            {
                name: 'DOMAIN',
                type: 'string',
                label: 'Domain Abbreviation'
            },
            {
                name: 'DRVFL',
                type: 'string',
                label: 'Derived Flag'
            },
            {
                name: 'DTC',
                type: 'string',
                label: 'Date/Time'
            },
            {
                name: 'DY',
                type: 'number',
                label: 'Study Day'
            },
            {
                name: 'ELTM',
                type: 'string',
                label: 'Elapsed Time from Reference Point'
            },
            {
                name: 'GRPID',
                type: 'string',
                label: 'Group ID'
            },
            {
                name: 'LOINC',
                type: 'string',
                label: 'LOINC Code'
            },
            {
                name: 'ORRES',
                type: 'string',
                label: 'Result or Finding in Original Units'
            },
            {
                name: 'ORRESU',
                type: 'string',
                label: 'Original Units'
            },
            {
                name: 'REASND',
                type: 'string',
                label: 'Reason Not Done'
            },
            {
                name: 'SCAT',
                type: 'string',
                label: 'Subcategory'
            },
            {
                name: 'SEQ',
                type: 'number',
                label: 'Sequence Number'
            },
            {
                name: 'SPID',
                type: 'string',
                label: 'Sponsor-Defined Identifier'
            },
            {
                name: 'STAT',
                type: 'string',
                label: 'Status'
            },
            {
                name: 'STRESC',
                type: 'string',
                label: 'Character Result/Finding in Std Format'
            },
            {
                name: 'STRESN',
                type: 'number',
                label: 'Numeric Result/Finding in Standard Units'
            },
            {
                name: 'STRESU',
                type: 'string',
                label: 'Standard Units'
            },
            {
                name: 'STUDYID',
                type: 'string',
                label: 'Study Identifier'
            },
            {
                name: 'TEST',
                type: 'string',
                label: 'Test Name'
            },
            {
                name: 'TESTCD',
                type: 'string',
                label: 'Test Short Name'
            },
            {
                name: 'TPT',
                type: 'string',
                label: 'Planned Time Point Name'
            },
            {
                name: 'TPTNUM',
                type: 'number',
                label: 'Planned Time Point Number'
            },
            {
                name: 'TPTREF',
                type: 'string',
                label: 'Time Point Reference'
            },
            {
                name: 'USUBJID',
                type: 'string',
                label: 'Unique Subject Identifier'
            },
            {
                name: 'VISIT',
                type: 'string',
                label: 'Visit Name'
            },
            {
                name: 'VISITDY',
                type: 'number',
                label: 'Planned Study Day of Visit'
            },
            {
                name: 'VISITNUM',
                type: 'number',
                label: 'Visit Number'
            }
        ]
    };

    var dm = {
        spec: 'dm',
        variables: [
            {
                name: 'AGE',
                label: 'Age in AGEU at RFSTDTC ',
                type: 'number'
            },
            {
                name: 'AGEU',
                label: 'Age Units',
                type: 'string'
            },
            {
                name: 'ARM',
                label: 'Description of Planned Arm',
                type: 'string'
            },
            {
                name: 'ARMCD',
                label: 'Planned Arm Code',
                type: 'string'
            },
            {
                name: 'BRTHDTC',
                label: 'Date/Time of Birth',
                type: 'string'
            },
            {
                name: 'COUNTRY',
                label: 'Country',
                type: 'string'
            },
            {
                name: 'DMDTC',
                label: 'Date/Time of Collection',
                type: 'string'
            },
            {
                name: 'DMDY',
                label: 'Study Day of Collection',
                type: 'number'
            },
            {
                name: 'DOMAIN',
                label: 'Domain Abbreviation',
                type: 'string'
            },
            {
                name: 'ETHNIC',
                label: 'Ethnicity',
                type: 'string'
            },
            {
                name: 'INVID',
                label: 'Investigator Identifier',
                type: 'string'
            },
            {
                name: 'INVNAM',
                label: 'Investigator Name',
                type: 'string'
            },
            {
                name: 'RACE',
                label: 'Race',
                type: 'string'
            },
            {
                name: 'RFENDTC',
                label: 'Subject Reference End Date/Time',
                type: 'string'
            },
            {
                name: 'RFSTDTC',
                label: 'Subject Reference Start Date/Time',
                type: 'string'
            },
            {
                name: 'SEX',
                label: 'Sex',
                type: 'string'
            },
            {
                name: 'SITEID',
                label: 'Study Site Identifier',
                type: 'string'
            },
            {
                name: 'STUDYID',
                label: 'Study Identifier',
                type: 'string'
            },
            {
                name: 'SUBJID',
                label: 'Subject Identifier for the Study',
                type: 'string'
            },
            {
                name: 'USUBJID',
                label: 'Unique Subject Identifier',
                type: 'string'
            }
        ]
    };

    var schema = {
        spec: 'adverse-events',
        variables: [
            {
                name: 'USUBJID',
                type: 'string',
                label: 'Unique Subject Identifier',
                sdtm: {
                    spec: 'dm',
                    name: 'USUBJID'
                },
                adam: 'USUBJID'
            },
            {
                name: 'SITEID',
                type: 'string',
                label: 'Study Site Identifier',
                sdtm: {
                    spec: 'dm',
                    name: 'SITEID'
                },
                adam: 'SITEID'
            },
            {
                name: 'AGE',
                type: 'number',
                label: 'Age',
                sdtm: {
                    spec: 'dm',
                    name: 'AGE'
                },
                adam: 'AGE'
            },
            {
                name: 'SEX',
                type: 'string',
                label: 'Sex',
                sdtm: {
                    spec: 'dm',
                    name: 'SEX'
                },
                adam: 'SEX'
            },
            {
                name: 'RACE',
                type: 'string',
                label: 'Race',
                sdtm: {
                    spec: 'dm',
                    name: 'RACE'
                },
                adam: 'RACE'
            },
            {
                name: 'ASTDT',
                type: 'string',
                label: 'Analysis Start Date',
                sdtm: {
                    spec: 'ae',
                    name: 'AESTDTC'
                },
                adam: 'ASTDT'
            },
            {
                name: 'ASTDY',
                type: 'number',
                label: 'Analysis Start Relative Day',
                sdtm: {
                    spec: 'ae',
                    name: 'AESTDY'
                },
                adam: 'ASTDY'
            },
            {
                name: 'AENDT',
                type: 'string',
                label: 'Analysis End Date',
                sdtm: {
                    spec: 'ae',
                    name: 'AEENDTC'
                },
                adam: 'AENDT'
            },
            {
                name: 'AENDY',
                type: 'number',
                label: 'Analysis End Relative Day',
                sdtm: {
                    spec: 'ae',
                    name: 'AEENDY'
                },
                adam: 'AENDY'
            },
            {
                name: 'AESEQ',
                type: 'number',
                label: 'Sequence Number',
                sdtm: {
                    spec: 'ae',
                    name: 'AESEQ'
                },
                adam: 'AESEQ'
            },
            {
                name: 'AETERM',
                type: 'string',
                label: 'Reported Term for the Adverse Event',
                sdtm: {
                    spec: 'ae',
                    name: 'AETERM'
                },
                adam: 'AETERM'
            },
            {
                name: 'AEDECOD',
                type: 'string',
                label: 'Dictionary-Derived Term',
                sdtm: {
                    spec: 'ae',
                    name: 'AEDECOD'
                },
                adam: 'AEDECOD'
            },
            {
                name: 'AEBODSYS',
                type: 'string',
                label: 'Body System or Organ Class',
                sdtm: {
                    spec: 'ae',
                    name: 'AEBODSYS'
                },
                adam: 'AEBODSYS'
            },
            {
                name: 'AESER',
                type: 'string',
                label: 'Serious Event',
                sdtm: {
                    spec: 'ae',
                    name: 'AESER'
                },
                adam: 'AESER'
            },
            {
                name: 'AESEV',
                type: 'string',
                label: 'Severity/Intensity',
                sdtm: {
                    spec: 'ae',
                    name: 'AESEV'
                },
                adam: 'AESEV'
            },
            {
                name: 'AEREL',
                type: 'string',
                label: 'Causality',
                sdtm: {
                    spec: 'ae',
                    name: 'AEREL'
                },
                adam: 'AEREL'
            },
            {
                name: 'AEOUT',
                type: 'string',
                label: 'Outcome',
                sdtm: {
                    spec: 'ae',
                    name: 'AEOUT'
                },
                adam: 'AEOUT'
            }
        ]
    };

    var schema$1 = {
        spec: 'medical-signs',
        variables: [
            {
                name: 'USUBJID',
                type: 'string',
                label: 'Unique Subject Identifier',
                sdtm: {
                    spec: 'dm',
                    name: 'USUBJID'
                },
                adam: 'USUBJID'
            },
            {
                name: 'SITEID',
                type: 'string',
                label: 'Study Site Identifier',
                sdtm: {
                    spec: 'dm',
                    name: 'SITEID'
                },
                adam: 'SITEID'
            },
            {
                name: 'AGE',
                type: 'number',
                label: 'Age',
                sdtm: {
                    spec: 'dm',
                    name: 'AGE'
                },
                adam: 'AGE'
            },
            {
                name: 'SEX',
                type: 'string',
                label: 'Sex',
                sdtm: {
                    spec: 'dm',
                    name: 'SEX'
                },
                adam: 'SEX'
            },
            {
                name: 'RACE',
                type: 'string',
                label: 'Race',
                sdtm: {
                    spec: 'dm',
                    name: 'RACE'
                },
                adam: 'RACE'
            },
            {
                name: 'VISIT',
                type: 'string',
                label: 'Analysis Visit',
                sdtm: {
                    spec: 'bds',
                    name: 'VISIT'
                },
                adam: 'AVISIT'
            },
            {
                name: 'VISITNUM',
                type: 'number',
                label: 'Analysis Visit (N)',
                sdtm: {
                    spec: 'bds',
                    name: 'VISITNUM'
                },
                adam: 'AVISITN'
            },
            {
                name: 'DT',
                type: 'number',
                label: 'Analysis Date',
                sdtm: {
                    spec: 'bds',
                    name: '__DTC'
                },
                adam: 'ADT'
            },
            {
                name: 'DY',
                type: 'number',
                label: 'Analysis Relative Day',
                sdtm: {
                    spec: 'bds',
                    name: '__DY'
                },
                adam: 'ADY'
            },
            {
                name: 'CAT',
                type: 'string',
                label: 'Parameter Category',
                sdtm: {
                    spec: 'bds',
                    name: '__CAT'
                },
                adam: 'PARCAT'
            },
            {
                name: 'TEST',
                type: 'string',
                label: 'Parameter',
                sdtm: {
                    spec: 'bds',
                    name: '__TEST'
                },
                adam: 'PARAM'
            },
            {
                name: 'STRESU',
                type: 'string',
                label: 'Units',
                sdtm: {
                    spec: 'bds',
                    name: '__STRESU'
                },
                adam: null
            },
            {
                name: 'STRESN',
                type: 'number',
                label: 'Analysis Value',
                sdtm: {
                    spec: 'bds',
                    name: '__STRESN'
                },
                adam: 'AVAL'
            },
            {
                name: 'STNRLO',
                type: 'number',
                label: 'Analysis Normal Range Upper Limit',
                sdtm: {
                    spec: 'bds',
                    name: '__STNRLO'
                },
                adam: 'ANRLO'
            },
            {
                name: 'STNRHI',
                type: 'number',
                label: 'Analysis Normal Range Upper Limit',
                sdtm: {
                    spec: 'bds',
                    name: '__STNRHI'
                },
                adam: 'ANRHI'
            }
        ]
    };

    var schemata = {
        ae: ae,
        bds: bds,
        dm: dm,
        adverseEvents: schema,
        medicalSigns: schema$1
    };

    /*
        spec            string  specification name
        data            array   observations
        variables       array   variable names
        schema          object  dataset schema
    */

    function checkDataSpecification() {
        this.data.forEach(function(dataset) {
            dataset.spec = (dataset.spec || dataset.type)
                .toLowerCase()
                .replace(/AEs/i, 'adverse-events')
                .replace(/Labs/i, 'medical-signs'); // backwards compatibility
            dataset.data = dataset.data || dataset.raw; // backwards compatibility
            dataset.variables = Object.keys(dataset.data[0]);

            if (dataset.spec === undefined) {
                var matches = [];
                var variables_std = Object.keys(dataset.data[0]).map(function(key) {
                    return key.replace(/^(LB|VS|EG|QS)/i, '');
                }); // remove BDS variable prefixes

                // Count the number of variables in the dataset that match variables in the schema.

                var _loop = function _loop(schema) {
                    var match = {
                        schema: schemata[schema]
                    };
                    match.variables = match.schema.variables.map(function(variable) {
                        return variable.name;
                    });
                    match.n = dataset.variables_std.filter(function(variable) {
                        return match.variables.includes(variable);
                    }).length;
                    matches.push(match);
                };

                for (var schema in schemata) {
                    _loop(schema);
                }

                // Choose the schema that with the greatest number of matching variables.
                dataset.schema = matches.find(function(match) {
                    return (
                        match.n ===
                        Math.max.apply(
                            Math,
                            toConsumableArray(
                                matches.map(function(match) {
                                    return match.n;
                                })
                            )
                        )
                    );
                });
                dataset.spec = dataset.schema.spec;
            } else {
                dataset.schema = schemata[dataset.spec.toLowerCase()];
            }
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

    function adverseEvents(dm, ae) {
        var _this = this;

        //DM variables
        var dmVariableMapping = schema.variables
            .filter(function(variable) {
                return variable.sdtm.spec === 'dm' && variable.name !== variable.sdtm.name;
            })
            .map(function(variable) {
                return {
                    old: variable.sdtm.name,
                    new: variable.name
                };
            });

        //AE variables
        var aeVariableMapping = schema.variables
            .filter(function(variable) {
                return variable.sdtm.spec === 'ae' && variable.name !== variable.sdtm.name;
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
                ae.data.map(function(d) {
                    return d.USUBJID;
                })
            )
            .values();
        var adae = this.clone(
            dm.data.filter(function(d) {
                return withAEs.indexOf(d.USUBJID) < 0;
            })
        );

        //Create shell adverse event variables for participants without adverse events.
        adae.forEach(function(d) {
            ae.variables.forEach(function(aeVariable) {
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
        ae.data.forEach(function(d) {
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
                dm.data.find(function(di) {
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

    function medicalSigns(dm, bds) {
        var _this = this;

        //DM variables
        var dmVariableMapping = schema$1.variables
            .filter(function(variable) {
                return variable.sdtm.spec === 'dm' && variable.name !== variable.sdtm.name;
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
                        bds.map(function(dataset) {
                            return dataset.data;
                        })
                    )
                    .map(function(d) {
                        return d.USUBJID;
                    })
            )
            .values();
        var adbds = this.clone(
            dm.data.filter(function(d) {
                return withResults.indexOf(d.USUBJID) < 0;
            })
        );

        //Create shell medical sign variables for participants without medical sign results.
        var schemaVariables = schema$1.variables
            .filter(function(variable) {
                return variable.sdtm.spec === 'bds';
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
        bds.forEach(function(dataset) {
            //ADBDS variables
            var bdsVariables = dataset.variables.filter(function(key) {
                return dm.variables.indexOf(key) < 0;
            });

            //If domain is not defined find most common two-character variable prefix, as the SDTM data standard prefixes variables with the two-character domain code.
            var domain = d3
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
                    return variable.sdtm.spec === 'bds' && variable.name !== variable.sdtm.name;
                })
                .map(function(variable) {
                    return {
                        sdtm: variable.sdtm.name.replace('__', domain),
                        name: variable.name
                    };
                });
            var sdtmRenames = bdsVariableMapping.map(function(mapping) {
                return mapping.sdtm;
            });

            //Merge demographics variables onto medical signs data.
            var domainRegex = new RegExp('^' + dataset.spec);
            dataset.data.forEach(function(d, i) {
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
                        dm.data.find(function(di) {
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
        // Define analysis adverse events dataset.
        if (
            this.data.some(function(dataset) {
                return dataset.spec === 'ae';
            })
        ) {
            var adverseEvents$$1 = {
                spec: 'adverse-events',
                data: adverseEvents.call(
                    this,
                    this.data.find(function(dataset) {
                        return dataset.spec === 'dm';
                    }),
                    this.data.find(function(dataset) {
                        return dataset.spec === 'ae';
                    })
                ),
                'Data Standard': 'Analysis'
            };
            adverseEvents$$1.variables = Object.keys(adverseEvents$$1.data[0]);
            adverseEvents$$1.schema = schema;
            this.data.push(adverseEvents$$1);
        }

        // Define analysis medical signs dataset.
        if (
            this.data.some(function(dataset) {
                return dataset.spec === 'bds';
            })
        ) {
            var medicalSigns$$1 = {
                spec: 'medical-signs',
                data: medicalSigns.call(
                    this,
                    this.data.find(function(dataset) {
                        return dataset.spec === 'dm';
                    }),
                    this.data.filter(function(dataset) {
                        return dataset.spec === 'bds';
                    })
                ),
                'Data Standard': 'Analysis'
            };

            medicalSigns$$1.variables = Object.keys(medicalSigns$$1.data[0]);
            medicalSigns$$1.schema = schema$1;

            this.data.push(medicalSigns$$1);
        }
    }

    function init(data) {
        var loadcsv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var sdtm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (loadcsv) loadFiles(this, data, sdtm);
        // load the csvs if requested
        else {
            //otherwise initialize the charts
            this.data = data;

            checkDataSpecification.call(this);

            //Merge SDTM data.
            if (sdtm) mergeData.call(this);

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
                renderer.settings.files = explorer.data.map(function(dataset) {
                    return {
                        Data: dataset.spec,
                        Rows: dataset.data.length,
                        Columns: dataset.variables.length,
                        json: dataset.data
                    };
                });
                renderer.dataFile = null;
            } else {
                renderer.dataFile = explorer.data.find(function(dataset) {
                    return dataset.spec === renderer.spec;
                });
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
                        renderer.dataFile.data.map(function(d) {
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
                var possible_events = ['datatransform', 'chartconfig', 'chartinit'];

                if (possible_events.indexOf(event) < 0) return;

                if (callback) {
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
