import json
import sys
import math
import pandas as pd
from shapely.geometry import shape, Point
# run pip install shapely

# load GeoJSON file
with open('neighborhoods.geojson') as f:
    js = json.load(f)

# load given data file
if len(sys.argv) is not 2:
    raise Exception('Please enter one CSV file name.')

input_file = sys.argv[1]
output_file = 'neighborhoods_' + input_file
data = pd.read_csv(input_file, encoding='utf8')
output = pd.DataFrame(columns=['crime_id', 'neighborhood'])

# check for lat/lng columns
if 'lat' not in data.columns:
	raise ValueError('Input has no latitude column')
if 'lng' not in data.columns:
	raise ValueError('Input has no longitude column')

for index, row in data.iterrows():
    # construct point based on lat/lng
    lat = row['lat']
    lng = row['lng']
    crime_id = row['crime_id']
    if math.isnan(lat) or math.isnan(lng):
        continue

    point = Point(lng, lat)
    output.set_value(index, 'crime_id', crime_id)
    output.set_value(index, 'neighborhood', None)

    # find which neighborhood this point is in and save
    for feature in js['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(point):
            name = feature['properties']['name']
            print name
            output.set_value(index, 'neighborhood', name)

output.to_csv(output_file, index=False, encoding='utf8')
