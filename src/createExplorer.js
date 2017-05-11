import { init } from "./explorer/init";
import { layout } from "./explorer/layout";
import { nav } from "./explorer/nav";
import { charts } from "./explorer/charts";

export function createExplorer(element = "body", config) {
  let explorer = {
    element: element,
    config: config,
    init: init,
    layout: layout,
    nav: nav,
    charts: charts
  };

  return explorer;
}
