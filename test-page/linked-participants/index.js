//Array of SDTM data files.
const dataArray = [
    {
        type: 'DM', // demographics
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/dm.csv',
    },
    {
        type: 'AE', // adverse events
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/ae.csv'
    },
    {
        type: 'BDS', // basic data structure: labs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/lb.csv',
    },
    {
        type: 'BDS', // basic data structure: vital signs
        path: 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/cdisc-pilot-01/vs.csv',
    },
];

/*------------------------------------------------------------------------------------------------\
 * Settings
\------------------------------------------------------------------------------------------------*/
    const settings = {
      renderers:["ae-timelines","safety-outlier-explorer","hep-explorer"],
        initial_renderer: window && window.location && window.location.hash
            ? window.location.hash.substring(1)
            : null, // allow linking to each renderer
        custom_settings: [
            {
                renderer_name: 'ae-timelines',
                filters: [
                    {
                        value_col: 'AESER',
                        label: 'Serious?',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AESEV',
                        label: 'Severity',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEREL',
                        label: 'Relationship',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEOUT',
                        label: 'Outcome',
                        type: 'event',
                        start: null
                    },
                ]//.concat(clone(filters)),
            },
            {
                renderer_name: 'safety-outlier-explorer',
  //              filters: clone(filters),
            },
            {
                renderer_name: 'hep-explorer',
//                group_cols: clone(filters),
//                filters: clone(filters),
                measure_values:{
                    'ALT':'Alanine Aminotransferase',
                    'AST':'Aspartate Aminotransferase',
                    'TB':'Bilirubin',
                    'ALP':'Alkaline Phosphatase'
                },
            },
        ],
    };


    d3.selectAll('#container *').remove();
    var ses = safetyExplorerSuite
        .createExplorer(
            '#container', // element
            settings // settings
        )

    ses.on("datatransform",function(){
      console.log("transformed!")
    })

    ses.on("chartinit",function(){
      // set up a custom 'participantsSelected' event listener
      var explorer = this;
      var renderer = this.currentChart.renderer.name
      var chart = renderer == "hep-explorer" ?  this.currentChart.chart : this.currentChart
      chart.wrap.on("participantsSelected",function(d){
        if(d3.event.data !=""){
          explorer.participantSelected = d3.event.data
          d3.select("#pt").html("Participant ID "+ d3.event.data+" currently selected. <span id='clear' style='color:blue; cursor:pointer'>Clear</span>")
          d3.select("span#clear").on("click",function(){
            d3.select("#pt").text("Select a participant to see thier details when you change charts.")
          })
        }
      })

      //If an ID is selected, then "automatically" highlight the participant
      if(explorer.participantSelected){

        if(renderer =="ae-timelines"){
          var ptMark  = chart.svg
          .select('.y.axis')
          .selectAll('.tick')
          .filter(d=>d==explorer.participantSelected)
        }else if(renderer=="safety-outlier-explorer"){
          console.log(chart.lines)
          var ptMark = chart.lines.filter(function(d){
            var id = d.values[0].values.raw[0][chart.config.id_col]
            return explorer.participantSelected == id
          })
        }else if(renderer=="hep-explorer"){
          var ptMark = chart.marks[0].circles.filter(function(d){
            return d.key == explorer.participantSelected
          })
        }
        
        ptMark.node().dispatchEvent(new Event('click'))
      }
    })

    ses.init(
        dataArray, // array of data files
        true, // load .csv files?
        true // SDTM-structured data files?
    );
