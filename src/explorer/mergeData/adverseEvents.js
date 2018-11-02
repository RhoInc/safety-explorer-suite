import schema from '../schema/adverse-events';

export default function adverseEvents(dm, ae) {
    //DM variables
    const dmVariables = Object.keys(dm.raw[0]);
    const dmVariableMapping = schema.variables
        .filter(variable => variable.sdtm.domain === 'DM' && variable.name !== variable.sdtm.name)
        .map(variable => {
            return {
                old: variable.sdtm.name,
                new: variable.name
            };
        });

    //AE variables
    const aeVariables = Object.keys(ae.raw[0]).filter(key => dmVariables.indexOf(key) < 0);
    const aeVariableMapping = schema.variables
        .filter(variable => variable.sdtm.domain === 'AE' && variable.name !== variable.sdtm.name)
        .map(variable => {
            return {
                sdtm: variable.sdtm.name,
                name: variable.name
            };
        });
    const sdtmRenames = aeVariableMapping.map(mapping => mapping.sdtm);

    //Create shell records for participants without adverse events.
    const withAEs = d3.set(ae.raw.map(d => d.USUBJID)).values();
    const adae = this.clone(dm.raw.filter(d => withAEs.indexOf(d.USUBJID) < 0));

    //Create shell adverse event variables for participants without adverse events.
    adae.forEach(d => {
        for (const aeVariable of aeVariables) {
            const variable =
                sdtmRenames.indexOf(aeVariable) > -1
                    ? aeVariableMapping.find(mapping => mapping.sdtm === aeVariable).name
                    : aeVariable;
            d[variable] = '';
        }
    });

    //Merge demographics variables onto adverse events data.
    ae.raw.forEach(d => {
        const datum = {};
        for (const aeVariable in d) {
            const variable =
                sdtmRenames.indexOf(aeVariable) > -1
                    ? aeVariableMapping.find(mapping => mapping.sdtm === aeVariable).name
                    : aeVariable;
            datum[variable] = d[aeVariable];
        }
        const dmDatum = this.clone(dm.raw.find(di => di.USUBJID === d.USUBJID));
        for (const prop in dmDatum) datum[prop] = datum[prop] || dmDatum[prop];
        adae.push(datum);
    });

    return adae;
}
