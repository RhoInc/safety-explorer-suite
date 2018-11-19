export default {
    standard: 'medical signs',
    variables: [
        {
            name: 'USUBJID',
            type: 'string',
            label: 'Unique Subject Identifier',
            sdtm: {
                domain: 'DM',
                name: 'USUBJID'
            },
            adam: 'USUBJID'
        },
        {
            name: 'SITEID',
            type: 'string',
            label: 'Study Site Identifier',
            sdtm: {
                domain: 'DM',
                name: 'SITEID'
            },
            adam: 'SITEID'
        },
        {
            name: 'AGE',
            type: 'number',
            label: 'Age',
            sdtm: {
                domain: 'DM',
                name: 'AGE'
            },
            adam: 'AGE'
        },
        {
            name: 'SEX',
            type: 'string',
            label: 'Sex',
            sdtm: {
                domain: 'DM',
                name: 'SEX'
            },
            adam: 'SEX'
        },
        {
            name: 'RACE',
            type: 'string',
            label: 'Race',
            sdtm: {
                domain: 'DM',
                name: 'RACE'
            },
            adam: 'RACE'
        },
        {
            name: 'VISIT',
            type: 'string',
            label: 'Analysis Visit',
            sdtm: {
                domain: 'BDS',
                name: 'VISIT'
            },
            adam: 'AVISIT'
        },
        {
            name: 'VISITNUM',
            type: 'number',
            label: 'Analysis Visit (N)',
            sdtm: {
                domain: 'BDS',
                name: 'VISITNUM'
            },
            adam: 'AVISITN'
        },
        {
            name: 'DT',
            type: 'number',
            label: 'Analysis Date',
            sdtm: {
                domain: 'BDS',
                name: '__DTC'
            },
            adam: 'ADT'
        },
        {
            name: 'DY',
            type: 'number',
            label: 'Analysis Relative Day',
            sdtm: {
                domain: 'BDS',
                name: '__DY'
            },
            adam: 'ADY'
        },
        {
            name: 'CAT',
            type: 'string',
            label: 'Parameter Category',
            sdtm: {
                domain: 'BDS',
                name: '__CAT'
            },
            adam: 'PARCAT'
        },
        {
            name: 'TEST',
            type: 'string',
            label: 'Parameter',
            sdtm: {
                domain: 'BDS',
                name: '__TEST'
            },
            adam: 'PARAM'
        },
        {
            name: 'STRESU',
            type: 'string',
            label: 'Units',
            sdtm: {
                domain: 'BDS',
                name: '__STRESU'
            },
            adam: null
        },
        {
            name: 'STRESN',
            type: 'number',
            label: 'Analysis Value',
            sdtm: {
                domain: 'BDS',
                name: '__STRESN'
            },
            adam: 'AVAL'
        },
        {
            name: 'STNRLO',
            type: 'number',
            label: 'Analysis Normal Range Upper Limit',
            sdtm: {
                domain: 'BDS',
                name: '__STNRLO'
            },
            adam: 'ANRLO'
        },
        {
            name: 'STNRHI',
            type: 'number',
            label: 'Analysis Normal Range Upper Limit',
            sdtm: {
                domain: 'BDS',
                name: '__STNRHI'
            },
            adam: 'ANRHI'
        }
    ]
};
