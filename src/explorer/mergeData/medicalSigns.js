import schema from '../schema/medical-signs';

export default function medicalSigns(dm, bds) {
    //DM variables
    const dmVariableMapping = schema.variables
        .filter(variable => variable.sdtm.spec === 'dm' && variable.name !== variable.sdtm.name)
        .map(variable => {
            return {
                old: variable.sdtm.name,
                new: variable.name
            };
        });

    //Create shell records for participants without medical sign results.
    const withResults = d3
        .set(d3.merge(bds.map(dataset => dataset.data)).map(d => d.USUBJID))
        .values();
    const adbds = this.clone(dm.data.filter(d => withResults.indexOf(d.USUBJID) < 0));

    //Create shell medical sign variables for participants without medical sign results.
    const schemaVariables = schema.variables
        .filter(variable => variable.sdtm.spec === 'bds')
        .map(variable => variable.name);
    adbds.forEach(d => {
        schemaVariables.forEach(variable => {
            d[variable] = '';
        });
    });

    //Iterate over BDS data arrays.
    bds.forEach(dataset => {
        //ADBDS variables
        const bdsVariables = dataset.variables.filter(key => dm.variables.indexOf(key) < 0);

        //If domain is not defined find most common two-character variable prefix, as the SDTM data standard prefixes variables with the two-character domain code.
        const domain = d3
            .nest()
            .key(d => d)
            .rollup(d => d.length)
            .entries(bdsVariables.map(variable => variable.substring(0, 2)))
            .sort((a, b) => b.values - a.values)[0].key;

        //Capture variable mappings from schema with which to rename domain-specific variables.
        const bdsVariableMapping = schema.variables
            .filter(
                variable => variable.sdtm.spec === 'bds' && variable.name !== variable.sdtm.name
            )
            .map(variable => {
                return {
                    sdtm: variable.sdtm.name.replace('__', domain),
                    name: variable.name
                };
            });
        const sdtmRenames = bdsVariableMapping.map(mapping => mapping.sdtm);

        //Merge demographics variables onto medical signs data.
        const domainRegex = new RegExp(`^${dataset.spec}`);
        dataset.data.forEach((d, i) => {
            const datum = {};
            for (const bdsVariable in d) {
                const variable =
                    sdtmRenames.indexOf(bdsVariable) > -1
                        ? bdsVariableMapping.find(mapping => mapping.sdtm === bdsVariable).name
                        : bdsVariable;
                datum[variable] = d[bdsVariable];
            }
            Object.assign(datum, this.clone(dm.data.find(di => di.USUBJID === d.USUBJID)));
            adbds.push(datum);
        });
    });

    return adbds;
}
