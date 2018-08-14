export default {
    standard: 'adverse events',
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
            name: 'ASTDT',
            type: 'string',
            label: 'Analysis Start Date',
            sdtm: {
                domain: 'AE',
                name: 'AESTDTC'
            },
            adam: 'ASTDT'
        },
        {
            name: 'ASTDY',
            type: 'number',
            label: 'Analysis Start Relative Day',
            sdtm: {
                domain: 'AE',
                name: 'AESTDY'
            },
            adam: 'ASTDY'
        },
        {
            name: 'AENDT',
            type: 'string',
            label: 'Analysis End Date',
            sdtm: {
                domain: 'AE',
                name: 'AEENDTC'
            },
            adam: 'AENDT'
        },
        {
            name: 'AENDY',
            type: 'number',
            label: 'Analysis End Relative Day',
            sdtm: {
                domain: 'AE',
                name: 'AEENDY'
            },
            adam: 'AENDY'
        },
        {
            name: 'AESEQ',
            type: 'number',
            label: 'Sequence Number',
            sdtm: {
                domain: 'AE',
                name: 'AESEQ'
            },
            adam: 'AESEQ'
        },
        {
            name: 'AETERM',
            type: 'string',
            label: 'Reported Term for the Adverse Event',
            sdtm: {
                domain: 'AE',
                name: 'AETERM'
            },
            adam: 'AETERM'
        },
        {
            name: 'AEDECOD',
            type: 'string',
            label: 'Dictionary-Derived Term',
            sdtm: {
                domain: 'AE',
                name: 'AEDECOD'
            },
            adam: 'AEDECOD'
        },
        {
            name: 'AEBODSYS',
            type: 'string',
            label: 'Body System or Organ Class',
            sdtm: {
                domain: 'AE',
                name: 'AEBODSYS'
            },
            adam: 'AEBODSYS'
        },
        {
            name: 'AESER',
            type: 'string',
            label: 'Serious Event',
            sdtm: {
                domain: 'AE',
                name: 'AESER'
            },
            adam: 'AESER'
        },
        {
            name: 'AESEV',
            type: 'string',
            label: 'Severity/Intensity',
            sdtm: {
                domain: 'AE',
                name: 'AESEV'
            },
            adam: 'AESEV'
        },
        {
            name: 'AEREL',
            type: 'string',
            label: 'Causality',
            sdtm: {
                domain: 'AE',
                name: 'AEREL'
            },
            adam: 'AEREL'
        },
        {
            name: 'AEOUT',
            type: 'string',
            label: 'Outcome',
            sdtm: {
                domain: 'AE',
                name: 'AEOUT'
            },
            adam: 'AEOUT'
        }
    ]
};
