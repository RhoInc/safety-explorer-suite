export default {
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
