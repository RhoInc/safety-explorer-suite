const settings = {
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
};


d3.csv('../../data/safetyData-queries/ADAE.csv', function(data) {
    aeTable.createChart('#ae-table .content', settings)
        .init(data);
});
