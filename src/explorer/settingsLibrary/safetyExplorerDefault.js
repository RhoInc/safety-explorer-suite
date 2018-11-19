export const safetyExplorerDefault = [
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
                vertical_space: 100
            } // Specify vertical space for rotated tick labels.  Maps to [margin.bottom].
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
