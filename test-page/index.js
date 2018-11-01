const ses = safetyExplorerSuite
    .createExplorer('#container', {});

const dataArray = [
    {
        type: 'DM',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/DM.csv'
    },
    {
        type: 'AE',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/AE.csv'
    },
    {
        type: 'BDS',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/LB.csv'
    },
    {
        type: 'BDS',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/VS.csv'
    },
];

ses.init(dataArray, true, true);
console.log(ses);
