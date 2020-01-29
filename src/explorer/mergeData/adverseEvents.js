import schema from '../schema/adverse-events';

export default function adverseEvents(dm, ae) {
    //DM variables
    const dmVariableMapping = schema.variables
        .filter(variable => variable.sdtm.spec === 'dm' && variable.name !== variable.sdtm.name)
        .map(variable => {
            return {
                old: variable.sdtm.name,
                new: variable.name
            };
        });

    //AE variables
    const aeVariableMapping = schema.variables
        .filter(variable => variable.sdtm.spec === 'ae' && variable.name !== variable.sdtm.name)
        .map(variable => {
            return {
                sdtm: variable.sdtm.name,
                name: variable.name
            };
        });
    const sdtmRenames = aeVariableMapping.map(mapping => mapping.sdtm);

    //Create shell records for participants without adverse events.
    const withAEs = d3.set(ae.data.map(d => d.USUBJID)).values();
    const adae = this.clone(dm.data.filter(d => withAEs.indexOf(d.USUBJID) < 0));

    //Create shell adverse event variables for participants without adverse events.
    adae.forEach(d => {
        ae.variables.forEach(aeVariable => {
            const variable =
                sdtmRenames.indexOf(aeVariable) > -1
                    ? aeVariableMapping.find(mapping => mapping.sdtm === aeVariable).name
                    : aeVariable;
            d[variable] = '';
        });
    });

    //Merge demographics variables onto adverse events data.
    ae.data.forEach(d => {
        const datum = {};
        for (const aeVariable in d) {
            const variable =
                sdtmRenames.indexOf(aeVariable) > -1
                    ? aeVariableMapping.find(mapping => mapping.sdtm === aeVariable).name
                    : aeVariable;
            datum[variable] = d[aeVariable];
        }
        const dmDatum = this.clone(dm.data.find(di => di.USUBJID === d.USUBJID));
        for (const prop in dmDatum) datum[prop] = datum[prop] || dmDatum[prop];
        adae.push(datum);
    });

    return adae;
}
