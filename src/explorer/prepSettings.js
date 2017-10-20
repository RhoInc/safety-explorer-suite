import defaultSettings from "./defaultSettings";

export function prepSettings(explorer) {
  //set defaults and update the renderers accordingly
  explorer.config.renderers =
    explorer.config.renderers || defaultSettings.renderers;

  //only keep the selected renderers (or keep them all if none are specified)
  if (explorer.config.renderers) {
    explorer.charts.renderers = explorer.charts.renderers.filter(
      d => explorer.config.renderers.indexOf(d.name) > -1
    );
  }

  //Title and instructions
  explorer.config.title = explorer.config.title || defaultSettings.title;
  explorer.config.instructions =
    explorer.config.instructions || defaultSettings.instructions;

  //chartSettings object
  explorer.config.chartSettings =
    explorer.config.chartSettings || defaultSettings.chartSettings;

  //Map depricated custom_settings object to config.chartSettings.custom (if no other settings are provided)
  if (
    explorer.config.custom_settings.length &
    !explorer.config.chartSettings.custom
  ) {
    explorer.config.chartSettings.custom = explorer.config.custom_settings;
  }

  //Attempt to load the settings if a file is specified
  explorer.config.chartSettings.load = explorer.config.chartSettings.location
    .file
    ? true
    : false;
}
