# leaflet-challenge
Assignment 15 - Web Mapping

Creating Earthquake Visualisation

This task is to visualise an earthquake dataset. 

This was carried out with the following steps:

Get dataset from the USGS that provides earthquake data in a number of different formats and updated every 5 minutes. The USGS GeoJSON Feed Links (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) has the dataset to visualise. 

Using the dataset such as "All Earthquakes from the Past 7 Days", a JSON representation of that data will be given. The URL of this JSON was used to pull in the data for the visualisation.

Using Leaflet, a map was created that plots all the earthquakes from the dataset based on their longitude and latitude.

Data markers were added that reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes would appear larger, and earthquakes with greater depth would appear darker in colour.

Popups that provide additional information about the earthquake when its associated marker is clicked was added.

A legend was alos created that provide context to the map data.
