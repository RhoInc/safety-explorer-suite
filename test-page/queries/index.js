const adae = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adae_queries.csv')
    .then(response => response.text());
const adbds = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds_queries.csv')
    .then(response => response.text());
Promise.all([adae,adbds])
    .then(values => {
        return [
            {
                type: 'AEs',
                'Data Standard': 'Analysis',
                raw: d3.csv.parse(values[0]),
            },
            {
                type: 'Labs',
                'Data Standard': 'Analysis',
                raw: d3.csv.parse(values[1])
            }
        ];
    })
    .then(dataArray => {
        safetyExplorerSuite
            .createExplorer('#container', settings)
            .init(dataArray);
    });
