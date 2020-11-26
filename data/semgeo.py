import re
import json
import io
import codecs
import pandas
from geopy.geocoders import Nominatim
from geopy.distance import vincenty
def geocode(string):
    geolocator = Nominatim()
    # {'place_id': '179295570',
    #  'licence': 'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright',
    #  'osm_type': 'rel
    #  ation', 'osm_id': '2555133', 'boundingbox': ['55.4913076', '55.9574097', '37.290502', '37.9674277'], 'lat': '
    #  55.7507178', 'lon': '37.6176606
    #      ', 'display_name': 'Москва, Центральный
    # административный
    # округ, Москва, Центральный
    # федеральный
    # округ, РФ
    # ', '
    #
    # class ': 'place', 'type': 'city'
    #
    # , 'importance': 0.92231629038453, 'icon':
    # 'https://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png'}

    # location = geolocator.geocode(string + ", Россия", language = 'ru')
    location = geolocator.geocode(string, language = 'ru')
    return [location.latitude, location.longitude] if location else (0,0)
alldata = []

# df = pandas.read_csv('very_real_neighbors.txt',sep='\t',  header=0)

# big = open('out.csv', 'w')
# beginner, jump =  [0, 500]
# for index, row in df.iterrows():
#     if index >= beginner:
#         print(index, row)
#         # fsql = open(str(index)+".txt", 'w')
#         # fsql.write("%s %s %s %s" % (index, row['Frequency'], row['Word'], geocode(str(row['Word']))))
#         # big.write("%s %s %s %s" % (index, row['Frequency'], row['Word'], geocode(str(row['Word']))))
#         # fsql.close()
#         # fsql.write(processed)
#     if index == beginner+jump:
#         exit()
# big.close()

# big = open('nei_with_latlong.csv', 'w')
# with open("very_real_neighbors.txt", encoding='utf-8') as f:
#     content = f.readlines()
# content = [x.strip() for x in content]
# for x in content:
#     coords = geocode(x)
#     # coords = (1, 2)
#     big.write("%s;%s;%s\n" % (x, coords[0], coords[1]))
#     alldata.append({"name":x, "lat": coords[0], "lng": coords[1]})
# big.close()
#
# with io.open('data.json', 'w', encoding='utf8') as json_file:
#     json.dump(alldata, json_file, ensure_ascii=False)

kvdict = {}

with open('data.json', encoding='utf-8') as json_data:
    d = json.load(json_data)
    for elem in d:
        kvdict[elem['name']] = elem

df = pandas.read_csv('unique_pairs_cities2.csv', sep=';')
big = open('distances2.csv', 'w')
for index, row in df.iterrows():
    w1  = row[0].lower()
    w2  = row[1].lower()
    if w1 in kvdict and w2 in kvdict:
        # print(index, kvdict[w1]['lat'], kvdict[w1]['lng'], "\t",kvdict[w2]['lat'], kvdict[w2]['lng'])
        # big.write("%s %s\t%s %s\n" % (kvdict[w1]['lat'], kvdict[w1]['lng'],kvdict[w2]['lat'], kvdict[w2]['lng']))
        if kvdict[w1]['lat'] or kvdict[w1]['lng'] or kvdict[w2]['lat'] or kvdict[w2]['lng']:
            km = vincenty((kvdict[w1]['lat'], kvdict[w1]['lng']),(kvdict[w2]['lat'], kvdict[w2]['lng'])).kilometers
            big.write("%s;%s;%s\n" % (w1, w2, km))
        # exit()
big.close()
print("OK :)")