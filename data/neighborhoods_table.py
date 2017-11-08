import json
import pandas as pd

# load GeoJSON file
with open('neighborhoods.geojson') as f:
    js = json.load(f)

output_file = 'neighborhoods.csv'
output = pd.DataFrame(columns=['id', 'name'])

for feature in js['features']:
    index = js['features'].index(feature)
    name = feature['properties']['name']
    name_list = name.split('_')
    title = ' '.join(name_list)
    output.set_value(index, 'id', index + 1)
    output.set_value(index, 'name', title.title())

output.to_csv(output_file, index=False, encoding='utf8')
