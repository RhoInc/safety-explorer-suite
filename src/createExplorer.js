import { init } from "./explorer/init";
import { layout } from "./explorer/layout";
import { nav } from "./explorer/nav";
import { charts } from "./explorer/charts";
import { loadFiles } from "./explorer/loadFiles";
import { prepSettings } from "./explorer/prepSettings";
import { settingsLibrary } from "./explorer/settingsLibrary";

export function createExplorer(element = "body", config) {
  let explorer = {
    element: element,
    config: config,
    init: init,
    layout: layout,
    nav: nav,
    loadFiles: loadFiles,
    prepSettings: prepSettings,
    charts: charts,
    settingsLibrary: settingsLibrary
  };

  explorer.events = {
    onDatatransform() {},
    onChartconfig() {}
  };

  explorer.on = function(event, callback) {
    let possible_events = ["datatransform", "chartconfig"];
    if (possible_events.indexOf(event) < 0) {
      return;
    }
    if (callback) {
      explorer.events[
        "on" + event.charAt(0).toUpperCase() + event.slice(1)
      ] = callback;
    }
  };
  return explorer;
}
