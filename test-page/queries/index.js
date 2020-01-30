const adae = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adae-queries.csv')
    .then(function(response) { return response.text(); });
const adbds = fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds-queries.csv')
    .then(function(response) { return response.text(); });
Promise.all([adae,adbds])
    .then(function(values) {
        return [
            {
                type: 'AEs',
                raw: d3.csv.parse(values[0]),
            },
            {
                type: 'Labs',
                raw: d3.csv.parse(values[1])
            }
        ];
    })
    .then(function(dataArray) {
        safetyExplorerSuite
            .createExplorer('#container', settings)
            .init(dataArray);
    });
