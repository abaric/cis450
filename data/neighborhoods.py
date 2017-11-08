import json
from shapely.geometry import shape, Point
# run pip install shapely

# load GeoJSON file
with open('neighborhoods.geojson') as f:
    js = json.load(f)

# construct point based on lat/lng returned by geocoder
# eventually this should take in all points in the given file
# the output neighborhood will create a relation
point = Point(-75.1953933,39.9483068)

# check each polygon to see if it contains the point
for feature in js['features']:
    polygon = shape(feature['geometry'])
    if polygon.contains(point):
        print 'Point in', feature['properties']['name']
