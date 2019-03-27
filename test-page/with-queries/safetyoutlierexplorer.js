var settings =
    {time_cols:
        [
            {value_col: 'VISITN'
            ,type: 'ordinal'
            ,label: 'Visit Number'
            ,rotate_tick_labels: true
            ,vertical_space: 70}
        ,
            {value_col: 'DY'
            ,type: 'linear'
            ,label: 'Study Day'
            ,rotate_tick_labels: false
            ,vertical_space: 0}
        ,
            {value_col: 'VISIT'
            ,type: 'ordinal'
            ,label: 'Visit'
            ,rotate_tick_labels: true
            ,vertical_space: 100} // Specify vertical space for rotated tick labels.  Maps to [margin.bottom].
        ]
    ,filters:
        [   {value_col: 'ARM', label: 'Arm'}
        ,   {value_col: 'SITEID', label: 'Site ID'}
        ,   {value_col: 'SEX', label: 'Sex'}
        ,   {value_col: 'RACE', label: 'Race'}
        ,   {value_col: 'QUERYFL', label: 'Open Query?'}]
    ,details:
        [   {value_col: 'ARM', label: 'Arm'}
        ,   {value_col: 'AGE', label: 'Age'}
        ,   {value_col: 'SEX', label: 'Sex'}
        ,   {value_col: 'RACE', label: 'Race'}]
    ,custom_marks:
        [
            {
                per: ['USUBJID', 'VISITN', 'STRESN'],
                type: 'circle',
                attributes: {
                    'fill-opacity': 1,
                    'stroke': 'red',
                    'fill': 'red'
                },
                values: {QUERYFL: ['Y']},
                tooltip: 'Query Details: [QUERYDETAILS]'
            }
        ]
    ,multiples_sizing: {width: 250,height: 75}
};

    d3.csv('../../data/safetyData-queries/ADBDS.csv', function(data) {
        safetyOutlierExplorer('#safety-outlier-explorer .content', settings)
            .init(data);
    });
