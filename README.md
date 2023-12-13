# belly-button-challenge
In this project, we built an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset revealed that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

We used D3.js to pull data from the api source, https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json 
We transformed the data in consulable format and loaded the IDs in drop down to select from. 

We then selected the specific IDs, and drill down in the data set to pick up specific OTU IDs and Samples to plot Bar graph for top 10 records, using plotly.js
we also plotted Bubble chart using plotly.js for the sample values using the sample value as the size of the bubble.
This analysis showed the distribution of microbes in belly button.

Files used,
index.html and app.js for loading the required dataset and plotting the chart.

 
