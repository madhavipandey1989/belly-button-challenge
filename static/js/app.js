
//import data from './samples.json' assert { type: 'json' };
var names;
var metadata;
var samples;
let data = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then( data => {
  
  names = data.names;
  metadata  = data.metadata;
  samples = data.samples;
  
  let dropDown = d3.select('#selDataset')

  let options = dropDown.selectAll("option")
  .data(names)
  .enter()
  .append("option");
 
  options.text(function(d) {
    return d;
     })
       .attr("value", function(d) {
    return d;
    });

  optionChanged("940");  

})


function optionChanged(selected) {
      var result = metadata.filter(obj => {
          return JSON.stringify(obj.id) === selected
        });
      let selectedMetadataObject = result["0"];  
      console.log(selectedMetadataObject);  
      populateSampleMetadata(selectedMetadataObject);
      createBar(selectedMetadataObject);
      createBubble(selectedMetadataObject);
}

function populateSampleMetadata(selectedMetadataObject){
  let metadataDiv = d3.select('#sample-metadata');
  metadataDiv.html("");
  metadataDiv.append("div").text("id: "+JSON.stringify(selectedMetadataObject.id));
  metadataDiv.append("div").text("ethnicity: "+JSON.stringify(selectedMetadataObject.ethnicity));
  metadataDiv.append("div").text("gender: "+JSON.stringify(selectedMetadataObject.gender));
  metadataDiv.append("div").text("age: "+JSON.stringify(selectedMetadataObject.age));
  metadataDiv.append("div").text("location: "+JSON.stringify(selectedMetadataObject.location));
  metadataDiv.append("div").text("bbtype: "+JSON.stringify(selectedMetadataObject.bbtype));
  metadataDiv.append("div").text("wfreq: "+JSON.stringify(selectedMetadataObject.wfreq));
}

function createBar(selectedMetadataObject){
  var selectedSample = samples.filter(obj => {
    return obj.id === JSON.stringify(selectedMetadataObject.id)
  });
  console.log(selectedSample[0]);

  var otu_ids = [];
  for(var i = 0; i < selectedSample[0].otu_ids.length; i++) {
    otu_ids.push("OTU "+selectedSample[0].otu_ids[i]);
  }
  var sample_values = selectedSample[0].sample_values;
  var otu_labels = selectedSample[0].otu_labels;
  sample_values = sample_values.slice(0,10).reverse();
  
  otu_ids =  otu_ids.slice(0,10).reverse();
  console.log(otu_ids);
  otu_labels = otu_labels.slice(0,10);

  let trace1 = {
    y: otu_ids,
    x: sample_values,
    hovertext: otu_labels,
    type: 'bar',
    orientation: 'h'
  };
  let data = [trace1];
  d3.select('#bar').html("");
  Plotly.newPlot("bar", data);

}

function createBubble(selectedMetadataObject){
  var selectedSample = samples.filter(obj => {
    return obj.id === JSON.stringify(selectedMetadataObject.id)
  });
  console.log(selectedSample[0]);

  var otu_ids = selectedSample[0].otu_ids;
  var sample_values = selectedSample[0].sample_values;
  var otu_labels = selectedSample[0].otu_labels;
  
  var trace2 = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
     marker: {
      size: sample_values, 
      color: otu_ids,
      colorscale:'Earth'
   },
    text : otu_labels
  };
  
  var data = [trace2];
  
  var layout = {
    xaxis:{
      title:"OTU ID"}
  };
  d3.select('#bubble').html("");
  Plotly.newPlot('bubble', data, layout);
}



