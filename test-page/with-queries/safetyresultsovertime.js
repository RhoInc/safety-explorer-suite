var settings =
    {time_settings:
        {value_col: 'VISIT'
        ,label: 'Visit'
        ,order: null // x-axis domain order (array)
        ,rotate_tick_labels: true
        ,vertical_space: 100}
    ,groups:
        [
            {value_col: 'NONE', label: 'None'}
        ,   {value_col: 'RACE', label: 'Race'}
        ,   {value_col: 'ARM' , label: 'Arm'}
        ,   {value_col: 'SEX' , label: 'Sex'}
        ]
    ,filters:
    [   {value_col: 'ARM', label: 'Arm'}
    ,   {value_col: 'SITEID', label: 'Site ID'}
    ,   {value_col: 'SEX', label: 'Sex'}
    ,   {value_col: 'RACE', label: 'Race'}
    ,   {value_col: 'QUERYFL', label: 'Open Query?'}]
    };
d3.csv('../../data/safetyData-queries/ADBDS.csv', function(data) {
    safetyResultsOverTime('#safety-results-over-time .content', settings)
        .init(data);
});
