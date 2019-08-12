import clone from './util/clone';
import { init } from './explorer/init';
import { layout } from './explorer/layout';
import { nav } from './explorer/nav';
import { charts } from './explorer/charts';
import { loadFiles } from './explorer/loadFiles';
import { prepSettings } from './explorer/prepSettings';
import { settingsLibrary } from './explorer/settingsLibrary';

export function createExplorer(element = 'body', config) {
    const explorer = {
        clone,
        element,
        config,
        init,
        layout,
        nav,
        loadFiles,
        prepSettings,
        charts,
        settingsLibrary,
        events: {
            onDatatransform() {},
            onChartconfig() {},
            onChartinit() {}
        },
        on: (event, callback) => {
            console.log('making event: ' + event);
            const possible_events = ['datatransform', 'chartconfig', 'chartinit'];

            if (possible_events.indexOf(event) < 0) return;

            if (callback) {
                console.log('saving the event ... ');
                explorer.events[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
            }
        }
    };

    return explorer;
}
