const dataArray = [
    {
        type: 'DM',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/dm.csv',
    },
    {
        type: 'AE',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/ae.csv',
    },
    {
        type: 'BDS',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/lb.csv',
    },
    {
        type: 'BDS',
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/vs.csv',
    },
];

initSafetyExplorerSuite();

//Load branches.
const branchRequest = new XMLHttpRequest();
branchRequest.onload = function() {
    const branches = JSON.parse(this.responseText)
        .map(function(branch) {
            return branch.name;
        })
        .sort(function(a,b) {
            return (
                a === 'master' ? -1 :
                b === 'master' ? 1 :
                /^dev-/.test(a) && /^dev-/.test(b) ? (a > b ? -1 : 1) :
                /^dev-/.test(a) ? -1 :
                /^dev-/.test(b) ? 1 :
                a < b ? -a : 1
            );
        });
    d3.select('.version-select__select')
        .selectAll('option.branch')
            .data(branches)
            .enter()
        .append('option')
        .classed('branch', true)
        .text(function(d) {
            return d;
        })
        .property('selected', function(d) {
            return d === 'master';
        });
}
branchRequest.open(
    'get',
    'https://api.github.com/repos/RhoInc/safety-explorer-suite/branches'
);
branchRequest.send();

//Load releases.
const releaseRequest = new XMLHttpRequest();
releaseRequest.onload = function() {
    const releases = JSON.parse(this.responseText)
        .map(function(release) {
            return release.name;
        })
        .sort(d3.descending);
    d3.select('.version-select__select')
        .selectAll('option.release')
            .data(releases)
            .enter()
        .append('option')
        .classed('release', true)
        .text(function(d) {
            return d;
        });
}
releaseRequest.open(
    'get',
    'https://api.github.com/repos/RhoInc/safety-explorer-suite/releases'
);
releaseRequest.send();

//Add version select functionality.
const baseURL = 'https://cdn.jsdelivr.net/gh/RhoInc/safety-explorer-suite';
d3.select('.version-select__submit')
    .on('click', function() {
        const version = d3.select('.version-select__select')
            .select('option:checked')
            .text();
        console.log(version);

        //Load .js file.
        const jsURL = version !== 'master'
            ? `${baseURL}@${version}/build/safetyExplorerSuite.js`
            : `${baseURL}/build/safetyExplorerSuite.js`;
        console.log(jsURL);
        const js = document.createElement('script');
        js.onload = function() {
            d3.selectAll('#container *').remove();
            initSafetyExplorerSuite();
        }
        js.src = jsURL;
        document.head.appendChild(js);

        //Load .css file.
        const cssURL = version !== 'master'
            ? `${baseURL}@${version}/css/safetyExplorerSuite.css`
            : `${baseURL}/css/safetyExplorerSuite.css`;
        console.log(cssURL);
        const css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = cssURL;
        document.head.appendChild(css);
    });

function clone(obj) {
    let copy;

    //boolean, number, string, null, undefined
    if ('object' != typeof obj || null == obj)
        return obj;

    //date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy [obj]! Its type is not supported.');
}

function initSafetyExplorerSuite() {
    safetyExplorerSuite
        .createExplorer('#container', {})
        .init(clone(dataArray), true, true);
}
