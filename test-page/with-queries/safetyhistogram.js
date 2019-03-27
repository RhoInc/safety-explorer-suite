var settings =
        {filters:
            [   {value_col: 'VISIT',    label: 'Visit'},
            ,   {value_col: 'ARM', label: 'Arm'}
            ,   {value_col: 'SITEID', label: 'Site ID'}
            ,   {value_col: 'SEX', label: 'Sex'}
            ,   {value_col: 'RACE', label: 'Race'}
            ,   {value_col: 'QUERYFL', label: 'Open Query?'}]
        ,details: [
            {value_col: 'USUBJID'     , label: 'Subject ID'},
            {value_col: 'SITEID'      , label: 'Site ID' },
            {value_col: 'SEX'         , label: 'Sex'    },
            {value_col: 'RACE'        , label: 'Race'   },
            {value_col: 'VISIT'       , label: 'Visit'  },
            {value_col: 'DY'          , label: 'Study Day' },
            {value_col: 'STNRLO'      , label: 'LLN' },
            {value_col: 'STRESN'      , label: 'Result'},
            {value_col: 'STNRHI'      , label: 'ULN' },
            {value_col: 'STRESU'      , label: 'Units' },
            {value_col: 'QUERYDETAILS', label: 'Query Details'}]
        };

    d3.csv('../../data/safetyData-queries/ADBDS.csv', function(data) {
        safetyHistogram('div.content', settings).init(data);
    });
