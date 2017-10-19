import defaultSettings from "./defaultSettings";

export function prepSettings(explorer) {
  //set defaults and update the renderers accordingly
  explorer.config.renderers =
    explorer.config.renderers || defaultSettings.renderers;
  explorer.config.custom_settings =
    explorer.config.custom_settings || defaultSettings.custom_settings;

  //only keep the selected renderers (or keep them all if none are specified)
  if (explorer.config.renderers) {
    explorer.charts.renderers = explorer.charts.renderers.filter(
      d => explorer.config.renderers.indexOf(d.name) > -1
    );
  }

  //customize the settings (or use the default settings if nothing is specified)
  if (explorer.config.custom_settings) {
    explorer.config.custom_settings.forEach(function(custom_setting) {
      var thisRenderer = explorer.charts.renderers.filter(function(renderer) {
        return custom_setting.renderer_name == renderer.name;
      })[0];

      if (thisRenderer) thisRenderer.settings = custom_setting;
    });
  }

  //Title and instructions
  explorer.config.title = explorer.config.title || defaultSettings.title;
  explorer.config.instructions =
    explorer.config.instructions || defaultSettings.instructions;
}
