import schema from '../schema/medical-signs';

export default function medicalSigns(dm, bds) {
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

    //Create shell records for participants without medical sign results.
    const withResults = d3.set(d3.merge(bds.map(data => data.raw)).map(d => d.USUBJID)).values();
    const adbds = dm.raw.filter(d => withResults.indexOf(d.USUBJID) < 0);

    //Create shell medical sign variables for participants without medical sign results.
    const bdsVariables = schema.variables
        .filter(variable => variable.sdtm.domain === 'BDS')
        .map(variable => variable.name);
    adbds.forEach(d => {
        for (const variable of bdsVariables) {
            d[variable] = '';
        }
    });

    //Iterate over BDS data arrays.
    bds.forEach(data => {
        //ADBDS variables
        const bdsVariables = Object.keys(data.raw[0]).filter(key => dmVariables.indexOf(key) < 0);
        const bdsVariableMapping = schema.variables
            .filter(
                variable => variable.sdtm.domain === 'BDS' && variable.name !== variable.sdtm.name
            )
            .map(variable => {
                return {
                    sdtm: variable.sdtm.name.replace('__', data.domain),
                    name: variable.name
                };
            });
        const sdtmRenames = bdsVariableMapping.map(mapping => mapping.sdtm);

        //Merge demographics variables onto medical signs data.
        const domainRegex = new RegExp(`^${data.domain}`);
        data.raw.forEach(d => {
            const datum = {};
            for (const bdsVariable in d) {
                const variable =
                    sdtmRenames.indexOf(bdsVariable) > -1
                        ? bdsVariableMapping.find(mapping => mapping.sdtm === bdsVariable).name
                        : bdsVariable;
                datum[variable] = d[bdsVariable];
            }
            Object.assign(datum, dm.raw.find(di => di.USUBJID === d.USUBJID));
            adbds.push(datum);
        });
    });

    return adbds;
}
