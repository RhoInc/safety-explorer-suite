export function loadSettings(explorer) {
  //parse the settings object to get the path
  var location = explorer.config.chartSettings.location.path
    ? explorer.config.chartSettings.location.path +
        explorer.config.chartSettings.location.file +
        ".json"
    : "library";

  //load the settings object
  if (location == "library") {
    explorer.config.chartSettings.imported =
      explorer.settingsLibrary[explorer.config.chartSettings.location.file];
    explorer.config.chartSettings.load = false;
    explorer.charts.init(explorer);
    explorer.charts.renderers[0].render();
  } else {
    d3.json(location, function(error, json) {
      if (error) {
        console.log("Couldn't load settings from json.");
        console.log(error);
      } else {
        explorer.config.chartSettings.imported = json;
        explorer.config.chartSettings.load = false;
        explorer.charts.init(explorer);
        explorer.charts.renderers[0].render();
      }
    });
  }
}
