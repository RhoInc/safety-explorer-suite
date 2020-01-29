import schemata from './schema/index';

/*
    spec            string  specification name
    data            array   observations
    variables       array   variable names
    schema          object  dataset schema
*/

export default function checkDataSpecification() {
    this.data.forEach(dataset => {
        dataset.spec = (dataset.spec || dataset.type)
            .toLowerCase()
            .replace(/AEs/i, 'adverse-events')
            .replace(/Labs/i, 'medical-signs'); // backwards compatibility
        dataset.data = dataset.data || dataset.raw; // backwards compatibility
        dataset.variables = Object.keys(dataset.data[0]);

        if (dataset.spec === undefined) {
            const matches = [];
            const variables_std = Object.keys(dataset.data[0]).map(key =>
                key.replace(/^(LB|VS|EG|QS)/i, '')
            ); // remove BDS variable prefixes

            // Count the number of variables in the dataset that match variables in the schema.
            for (const schema in schemata) {
                const match = {
                    schema: schemata[schema]
                };
                match.variables = match.schema.variables.map(variable => variable.name);
                match.n = dataset.variables_std.filter(variable =>
                    match.variables.includes(variable)
                ).length;
                matches.push(match);
            }

            // Choose the schema that with the greatest number of matching variables.
            dataset.schema = matches.find(
                match => match.n === Math.max(...matches.map(match => match.n))
            );
            dataset.spec = dataset.schema.spec;
        } else {
            dataset.schema = schemata[dataset.spec.toLowerCase()];
        }
    });
}
