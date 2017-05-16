import { init } from "./explorer/init";
import { layout } from "./explorer/layout";
import { nav } from "./explorer/nav";
import { charts } from "./explorer/charts";
import { loadFiles } from "./explorer/loadFiles";

export function createExplorer(element = "body", config) {
  let explorer = {
    element: element,
    config: config,
    init: init,
    layout: layout,
    nav: nav,
    loadFiles: loadFiles,
    charts: charts
  };

  return explorer;
}
