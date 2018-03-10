import defaultSettings from './defaultSettings';

export function prepSettings(explorer) {
    //set defaults and update the renderers accordingly
    explorer.config.renderers =
        explorer.config.renderers || explorer.charts.renderers.map(renderer => renderer.name);
    explorer.config.custom_settings =
        explorer.config.custom_settings || defaultSettings.custom_settings;

    //only keep the selected renderers (or keep them all if none are specified)
    explorer.charts.renderers = explorer.charts.renderers
        .filter(d => explorer.config.renderers.indexOf(d.name) > -1)
        .sort(
            (a, b) =>
                explorer.config.renderers.indexOf(a.name) -
                explorer.config.renderers.indexOf(b.name)
        );

    //set initial renderer
    explorer.config.initial_renderer =
        explorer.charts.renderers.find(
            renderer => renderer.name === explorer.config.initial_renderer
        ) || explorer.config.renderers[0];

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
    explorer.config.instructions = explorer.config.instructions || defaultSettings.instructions;
}
