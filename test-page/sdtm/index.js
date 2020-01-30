const metadata = [
    {
        spec: 'dm',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/dm.csv',
    },
    {
        spec: 'ae', // adverse events
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/ae.csv'
    },
    {
        spec: 'bds', // basic data structure: labs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/lb.csv',
    },
    {
        spec: 'bds', // basic data structure: vital signs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/vs.csv',
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
            true // SDTM-structured data files?
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
                    true // SDTM-structured data files?
                );
        });
}
