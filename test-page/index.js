const ses = safetyExplorerSuite
    .createExplorer('#container', {});

const dataArray = [
    {
        type: 'DM',
        //domain: 'DM',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/DM.csv',
        //path: '../../viz-library/data/safetyData/SDTM/DM.csv', // load local data file for performance
    },
    {
        type: 'AE',
        //domain: 'AE',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/AE.csv',
        //path: '../../viz-library/data/safetyData/SDTM/AE.csv', // load local data file for performance
    },
    {
        type: 'BDS',
        //domain: 'LB',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/LB.csv',
        //path: '../../viz-library/data/safetyData/SDTM/LB.csv', // load local data file for performance
    },
    {
        type: 'BDS',
        //domain: 'VS',
        path: 'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/safetyData/SDTM/VS.csv',
        //path: '../../viz-library/data/safetyData/SDTM/VS.csv', // load local data file for performance
    },
];

ses.init(dataArray, true, true);
