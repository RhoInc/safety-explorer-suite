import { init } from './explorer/init';
import { layout } from './explorer/layout';
import { nav } from './explorer/nav';
import { charts } from './explorer/charts';
import { loadFiles } from './explorer/loadFiles';
import { prepSettings } from './explorer/prepSettings';
export function createExplorer(element = 'body', config) {
    let explorer = {
        element: element,
        config: config,
        init: init,
        layout: layout,
        nav: nav,
        loadFiles: loadFiles,
        prepSettings: prepSettings,
        charts: charts
    };

    return explorer;
}
