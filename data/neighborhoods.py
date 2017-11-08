import json
import sys
import math
import pandas as pd
from shapely.geometry import shape, Point

# load GeoJSON file
with open('neighborhoods.geojson') as f:
    js = json.load(f)

# load given data file
if len(sys.argv) is not 2:
    raise Exception('Please enter one CSV file name.')
input_file = sys.argv[1]
output_file = 'neighborhoods_' + input_file
data = pd.read_csv(input_file, encoding='utf8')

# check for lat/lng columns
if 'lat' not in data.columns:
	raise ValueError('Input has no latitude column')
if 'lng' not in data.columns:
	raise ValueError('Input has no longitude column')

# replace this with whichever id you're searching for
table_id = 'crime_id'
if table_id not in data.columns:
	raise ValueError('Input has no id column')

output = pd.DataFrame(columns=[table_id, 'neighborhood_id'])

for index, row in data.iterrows():
    lat = row['lat']
    lng = row['lng']
    relation_id = int(row[table_id])

    # set initial values
    output.set_value(index, table_id, relation_id)
    output.set_value(index, 'neighborhood_id', None)

    # skip rows without valid lat/lng
    if math.isnan(lat) or math.isnan(lng):
        continue

    # find which neighborhood the point is in and save
    point = Point(lng, lat)
    for feature in js['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(point):
            # a neighborhood's id is one more than its index in the geojson
            n_id = js['features'].index(feature) + 1
            name = feature['properties']['name']
            output.set_value(index, 'neighborhood_id', n_id)

    # write the new value to the csv
    if relation_id is 1:
        output.to_csv(output_file, index=False, encoding='utf8')
    else:
        output.iloc[[index]].to_csv(output_file, index=False, header=False, mode='a', encoding='utf8')

    # some logging
    if relation_id % 1000 is 0:
        print 'Done', relation_id, 'relations'
