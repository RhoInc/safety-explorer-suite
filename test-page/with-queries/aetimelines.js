var settings =
    {color:
        {value_col: 'AEREL'
        ,label: 'Relationship'
        ,values:
            ['NOT RELATED'
            ,'UNLIKELY RELATED'
            ,'POSSIBLY RELATED'
            ,'PROBABLY RELATED'
            ,'DEFINITELY RELATED']}
    ,highlight:
        {value_col: 'QUERYFL'
        ,label: 'Open Query'
        ,value: 'Y'
        ,detail_col: 'QUERY'
        ,attributes:
            {'stroke': 'black'
            ,'stroke-width': '8'
            ,'fill': 'none'
            ,'stroke-opacity':"0.2"}}
    ,custom_marks:
        [
            {type: 'circle'
            ,per: ['USUBJID', 'AESEQ', 'wc_value']
            ,tooltip: 'Serious Adverse Event'
            ,radius: 6
            ,attributes:
                {'fill-opacity': .5
                ,'fill': 'None'
                ,'stroke': 'Red'}
            ,values: {"AESER": 'Y' ,"wc_category":"ASTDY"}}
        ]
    ,filters:
        [   {value_col: 'AESER', label: 'Serious Event'}
        ,   {value_col: 'AEREL', label: 'Relationship'}
        ,   {value_col: 'AESEV', label: 'Severity/Intensity'}
        ,   {value_col: 'USUBJID', label: 'Subject Identifier'}
        ,   {value_col: 'ARM', label: 'Arm'}
        ,   {value_col: 'SITEID', label: 'Site ID'}
        ,   {value_col: 'SEX', label: 'Sex'}
        ,   {value_col: 'RACE', label: 'Race'}
        ,   {value_col: 'QUERYFL', label: 'Has query?'}

        ]};

    d3.csv('../../data/safetyData-queries/ADAE.csv', function(data) {
        aeTimelines('#ae-timelines .content', settings)
            .init(data);
    });
