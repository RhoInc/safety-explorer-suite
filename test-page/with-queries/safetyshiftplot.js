const settings =
    {time_col: 'VISIT'
    ,x_params: {visits: ['Screening'], stat: 'min'}
    ,y_params: {visits: ['End of Study'], stat: 'max'}
    ,filters:
    [   {value_col: 'ARM', label: 'Arm'}
    ,   {value_col: 'SITEID', label: 'Site ID'}
    ,   {value_col: 'SEX', label: 'Sex'}
    ,   {value_col: 'RACE', label: 'Race'}
    ,   {value_col: 'QUERYFL', label: 'Open Query?'}]
};

d3.csv('../../data/safetyData-queries/ADBDS.csv', function(data) {
    safetyShiftPlot('#safety-shift-plot .content', settings)
        .init(data);
});
