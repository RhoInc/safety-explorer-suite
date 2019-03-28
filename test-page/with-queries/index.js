const test = {
    custom_settings: [
        {
            renderer_name: 'aeexplorer',
            'variables': {
                'group': 'ARM',
                'filters': [
                    { 'value_col': 'AESER', 'label': 'Serious?', 'type': 'event' },
                    { 'value_col': 'AESEV', 'label': 'Severity','type': 'event' },
                    { 'value_col': 'AEREL', 'label': 'Relationship','type': 'event' },
                    { 'value_col': 'AEOUT','label': 'Outcome','type': 'event' },
                    { 'value_col': 'SITEID', 'label': 'Site ID','type': 'participant' },
                    { 'value_col': 'ARM', 'label': 'Arm','type': 'participant' },
                    { 'value_col': 'SEX', 'label': 'Sex','type': 'participant' },
                    { 'value_col': 'RACE', 'label': 'Race','type': 'participant' },
                    { 'value_col': 'QUERYFL','label': 'Open Query?','type': 'event' }
                ]
            },
            'defaults': {
                'placeholderFlag': {'value_col': "AEBODSYS", 'values': [""] },
                'maxPrevalence': 10,
                'maxGroups': 7,
                'totalCol': true,
                'diffCol': true,
                'prefTerms': false
            },
            'plotSettings': { 'h': 15,
                'w': 200,
                'margin': { 'left': 40, 'right': 40 },
                'diffMargin': { "left": 5, "right": 5 },
                'r': 7 }
        }
    ],
};
const adae = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adae_queries.csv')
    .then(response => response.text());
const adbds = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds_queries.csv')
    .then(response => response.text());
Promise.all([adae,adbds])
    .then(values => {
        return [
            {
                type: 'AEs',
                'Data Standard': 'Analysis',
                raw: d3.csv.parse(values[0]),
            },
            {
                type: 'Labs',
                'Data Standard': 'Analysis',
                raw: d3.csv.parse(values[1])
            }
        ];
    })
    .then(dataArray => {
        safetyExplorerSuite
            .createExplorer('#container', settings)
            .init(dataArray);
    });
