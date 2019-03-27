// Set renderers.settings using the following (in order or preference):
// chartSettings.custom
// chartSettings.imported
// renderer.settings

export function prepSettings(explorer) {
    explorer.charts.renderers.forEach(function(renderer) {
        console.log(renderer);
        var customMatch = explorer.config.chartSettings.custom
            ? explorer.config.chartSettings.custom.filter(f => f.renderer_name == renderer.name)
            : [];
        var importedMatch = explorer.config.chartSettings.imported
            ? explorer.config.chartSettings.imported.filter(f => f.renderer_name == renderer.name)
            : [];

        if (customMatch.length) {
            renderer.settings = customMatch[0];
        } else if (importedMatch.length) {
            renderer.settings = importedMatch[0];
        }
    });

    //initialize user settings customizations
    explorer.events.onChartconfig.call(explorer);
}
