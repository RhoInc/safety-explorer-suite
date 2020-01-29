const metadata = [
    {
        spec: 'adverse-events',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/adam/adae.csv',
    },
    {
        spec: 'medical-signs',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv'
    },
];

if (Math.random() < .5) {
    console.log('Initializing safety-explorer-suite then fetching data.');
    safetyExplorerSuite
        .createExplorer(
            '#container', // element
            {} // settings
        )
        .init(
            metadata, // array of data files
            true, // load .csv files?
            false // SDTM-structured data files?
        );
} else {
    console.log('Fetching data then initializing safety-explorer-suite.');
    Promise.all(metadata.map(dataset => fetch(dataset.path)))
        .then(responses => Promise.all(responses.map(response => response.text())))
        .then(texts => Promise.all(texts.map(text => d3.csv.parse(text))))
        .then(datasets => {
            const data = datasets
                .map((dataset,i) => {
                    return {
                        data: dataset,
                        spec: metadata[i].spec,
                    };
                });

            safetyExplorerSuite
                .createExplorer(
                    '#container', // element
                    {} // settings
                )
                .init(
                    data, // array of data files
                    false, // load .csv files?
                    false // SDTM-structured data files?
                );
        });
}
