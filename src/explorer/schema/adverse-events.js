export default {
    spec: 'adverse-events',
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
            name: 'ASTDT',
            type: 'string',
            label: 'Analysis Start Date',
            sdtm: {
                spec: 'ae',
                name: 'AESTDTC'
            },
            adam: 'ASTDT'
        },
        {
            name: 'ASTDY',
            type: 'number',
            label: 'Analysis Start Relative Day',
            sdtm: {
                spec: 'ae',
                name: 'AESTDY'
            },
            adam: 'ASTDY'
        },
        {
            name: 'AENDT',
            type: 'string',
            label: 'Analysis End Date',
            sdtm: {
                spec: 'ae',
                name: 'AEENDTC'
            },
            adam: 'AENDT'
        },
        {
            name: 'AENDY',
            type: 'number',
            label: 'Analysis End Relative Day',
            sdtm: {
                spec: 'ae',
                name: 'AEENDY'
            },
            adam: 'AENDY'
        },
        {
            name: 'AESEQ',
            type: 'number',
            label: 'Sequence Number',
            sdtm: {
                spec: 'ae',
                name: 'AESEQ'
            },
            adam: 'AESEQ'
        },
        {
            name: 'AETERM',
            type: 'string',
            label: 'Reported Term for the Adverse Event',
            sdtm: {
                spec: 'ae',
                name: 'AETERM'
            },
            adam: 'AETERM'
        },
        {
            name: 'AEDECOD',
            type: 'string',
            label: 'Dictionary-Derived Term',
            sdtm: {
                spec: 'ae',
                name: 'AEDECOD'
            },
            adam: 'AEDECOD'
        },
        {
            name: 'AEBODSYS',
            type: 'string',
            label: 'Body System or Organ Class',
            sdtm: {
                spec: 'ae',
                name: 'AEBODSYS'
            },
            adam: 'AEBODSYS'
        },
        {
            name: 'AESER',
            type: 'string',
            label: 'Serious Event',
            sdtm: {
                spec: 'ae',
                name: 'AESER'
            },
            adam: 'AESER'
        },
        {
            name: 'AESEV',
            type: 'string',
            label: 'Severity/Intensity',
            sdtm: {
                spec: 'ae',
                name: 'AESEV'
            },
            adam: 'AESEV'
        },
        {
            name: 'AEREL',
            type: 'string',
            label: 'Causality',
            sdtm: {
                spec: 'ae',
                name: 'AEREL'
            },
            adam: 'AEREL'
        },
        {
            name: 'AEOUT',
            type: 'string',
            label: 'Outcome',
            sdtm: {
                spec: 'ae',
                name: 'AEOUT'
            },
            adam: 'AEOUT'
        }
    ]
};
