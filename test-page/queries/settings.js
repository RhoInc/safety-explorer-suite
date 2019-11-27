const settings = {
    "custom_settings": [
        {
            "renderer_name": "aeexplorer",
            "variables": {
                "group": "ARM",
                "filters": [
                    {
                        "value_col": "AESER",
                        "label": "Serious?",
                        "type": "event"
                    },
                    {
                        "value_col": "AESEV",
                        "label": "Severity",
                        "type": "event"
                    },
                    {
                        "value_col": "AEREL",
                        "label": "Relationship",
                        "type": "event"
                    },
                    {
                        "value_col": "AEOUT",
                        "label": "Outcome",
                        "type": "event"
                    },
                    {
                        "value_col": "SITEID",
                        "label": "Site ID",
                        "type": "participant"
                    },
                    {
                        "value_col": "ARM",
                        "label": "Arm",
                        "type": "participant"
                    },
                    {
                        "value_col": "SEX",
                        "label": "Sex",
                        "type": "participant"
                    },
                    {
                        "value_col": "RACE",
                        "label": "Race",
                        "type": "participant"
                    },
                    {
                        "value_col": "QUERYFL",
                        "label": "Open Query?",
                        "type": "event"
                    }
                ]
            },
            "defaults": {
                "placeholderFlag": {
                    "value_col": "AEBODSYS",
                    "values": [
                        ""
                    ]
                },
                "maxPrevalence": 10,
                "maxGroups": 7,
                "totalCol": true,
                "diffCol": true,
                "prefTerms": false
            },
            "plotSettings": {
                "h": 15,
                "w": 200,
                "margin": {
                    "left": 40,
                    "right": 40
                },
                "diffMargin": {
                    "left": 5,
                    "right": 5
                },
                "r": 7
            }
        },
        {
            "renderer_name": "ae-timelines",
            "color": {
                "value_col": "AEREL",
                "label": "Relationship",
                "values": [
                    "NOT RELATED",
                    "UNLIKELY RELATED",
                    "POSSIBLY RELATED",
                    "PROBABLY RELATED",
                    "DEFINITELY RELATED"
                ]
            },
            "highlight": {
                "value_col": "QUERYFL",
                "label": "Open Query",
                "value": "Y",
                "detail_col": "QUERY",
                "attributes": {
                    "stroke": "black",
                    "stroke-width": "8",
                    "fill": "none",
                    "stroke-opacity": "0.2"
                }
            },
            "custom_marks": [
                {
                    "type": "circle",
                    "per": [
                        "USUBJID",
                        "AESEQ",
                        "wc_value"
                    ],
                    "tooltip": "Serious Adverse Event",
                    "radius": 6,
                    "attributes": {
                        "fill-opacity": 0.5,
                        "fill": "None",
                        "stroke": "Red"
                    },
                    "values": {
                        "AESER": "Y",
                        "wc_category": "ASTDY"
                    }
                }
            ],
            "filters": [
                {
                    "value_col": "AESER",
                    "label": "Serious Event"
                },
                {
                    "value_col": "AEREL",
                    "label": "Relationship"
                },
                {
                    "value_col": "AESEV",
                    "label": "Severity/Intensity"
                },
                {
                    "value_col": "USUBJID",
                    "label": "Subject Identifier"
                },
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Has query?"
                }
            ]
        },
        {
            "renderer_name": "safety-histogram",
            "filters": [
                {
                    "value_col": "VISIT",
                    "label": "Visit"
                },
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ],
            "details": [
                {
                    "value_col": "USUBJID",
                    "label": "Subject ID"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "VISIT",
                    "label": "Visit"
                },
                {
                    "value_col": "DY",
                    "label": "Study Day"
                },
                {
                    "value_col": "STNRLO",
                    "label": "LLN"
                },
                {
                    "value_col": "STRESN",
                    "label": "Result"
                },
                {
                    "value_col": "STNRHI",
                    "label": "ULN"
                },
                {
                    "value_col": "STRESU",
                    "label": "Units"
                },
                {
                    "value_col": "QUERYDETAILS",
                    "label": "Query Details"
                }
            ]
        },
        {
            "renderer_name": "safety-outlier-explorer",
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ],
            "details": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "AGE",
                    "label": "Age"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                }
            ],
            "custom_marks": [
                {
                    "per": [
                        "USUBJID",
                        "VISITN",
                        "STRESN"
                    ],
                    "type": "circle",
                    "attributes": {
                        "fill-opacity": 1,
                        "stroke": "red",
                        "fill": "red"
                    },
                    "values": {
                        "QUERYFL": [
                            "Y"
                        ]
                    },
                    "tooltip": "Query Details: [QUERYDETAILS]"
                }
            ],
            "multiples_sizing": {
                "width": 250,
                "height": 75
            }
        },
        {
            "renderer_name": "paneled-outlier-explorer",
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ],
            "details": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "AGE",
                    "label": "Age"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                }
            ],
            "custom_marks": [
                {
                    "per": [
                        "USUBJID",
                        "VISITN",
                        "STRESN"
                    ],
                    "type": "circle",
                    "attributes": {
                        "fill-opacity": 1,
                        "stroke": "red",
                        "fill": "red"
                    },
                    "values": {
                        "QUERYFL": [
                            "Y"
                        ]
                    },
                    "tooltip": "Query Details: [QUERYDETAILS]"
                }
            ],
        },
        {
            "renderer_name": "safety-results-over-time",
            "time_settings": {
                "value_col": "VISIT",
                "label": "Visit",
                "order": null,
                "rotate_tick_labels": true,
                "vertical_space": 100
            },
            "groups": [
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
            ],
            "color_by": "ARM",
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ]
        },
        {
            "renderer_name": "safety-shift-plot",
            "time_col": "VISIT",
            "x_params": {
                "visits": [
                    "Screening"
                ],
                "stat": "min"
            },
            "y_params": {
                "visits": [
                    "End of Study"
                ],
                "stat": "max"
            },
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ]
        },
        {
            "renderer_name": "safety-delta-delta",
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ]
        },
        {
            "renderer_name": "hep-explorer",
            "filters": [
                {
                    "value_col": "ARM",
                    "label": "Arm"
                },
                {
                    "value_col": "SITEID",
                    "label": "Site ID"
                },
                {
                    "value_col": "SEX",
                    "label": "Sex"
                },
                {
                    "value_col": "RACE",
                    "label": "Race"
                },
                {
                    "value_col": "QUERYFL",
                    "label": "Open Query?"
                }
            ]
        }
    ],
    initial_renderer: window && window.location && window.location.hash
        ? window.location.hash.substring(1)
        : null // allow linking to each renderer
};
