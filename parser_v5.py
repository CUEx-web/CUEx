import gpxpy
import gpxpy.gpx
import re
import pandas as pd
import numpy as np

def correctPath(path):
    splitted = path.split('.')
    if len(splitted) > 1:
        return splitted[0]
    else:
        return path

filep = correctPath(input("Name of the file to parse:"))
file_path = '{}.gpx'.format(filep)
gpx_file = open(file_path, 'r')
gpx = gpxpy.parse(gpx_file)
lat = []
lon = []
ele = []
for track in gpx.tracks:
    for segment in track.segments:
        for point in segment.points:
            lat.append(point.latitude)
            lon.append(point.longitude)
            ele.append(point.elevation)
lat = list(map(str, lat))
lon = list(map(str, lon))
df_point = pd.DataFrame(columns =['latitude', 'longitude', 'elevation'])
df_point['latitude'] = lat
df_point['longitude'] = lon
df_point['elevation'] = ele

regex = '<wpt'
match_list = []
pre_line = ""
with open(file_path, 'r') as f:
    for li in f:
        for match in re.finditer(regex, li, re.S):
            status_code = match
            match_list.append(li)

a, b = [], []
numeric_const_pattern = '[-+]? (?: (?: \d* \. \d+ ) | (?: \d+ \.? ) )(?: [Ee] [+-]? \d+ ) ?'
rx = re.compile(numeric_const_pattern, re.VERBOSE)
for index in match_list:
    an = rx.findall(index)[0]
    bn = rx.findall(index)[1]
    a.append(an)
    b.append(bn)

dupl_index = []
for ix2, row  in df_point.iterrows():
    if( (df_point.loc[ix2, 'latitude'] not in a) | (df_point.loc[ix2, 'longitude'] not in b)):
        dupl_index.append(ix2)
df_point = df_point.drop(dupl_index).reset_index(drop=True)

regexn = ['<name>', '<cmt>']
name_list, nav_list = [], []
with open(file_path, 'r') as fn:
    for line_name in fn:
        for match in re.finditer(regexn[0], line_name, re.S):
            name_list.append(line_name)
        for match in re.finditer(regexn[1], line_name, re.S):
            nav_list.append(line_name)
del name_list[-1]

names, nav = [], []
for n in range(len(name_list)):
    tempname = (name_list[n].split("</name>")[0]).split('<name>')[1]
    tempnav = (nav_list[n].split("</cmt>")[0]).split('<cmt>')[1]
    names.append(tempname)
    nav.append(tempnav)
try:
    df_point['name'] = names
except ValueError:
    df_point.drop(0, axis = 0, inplace = True)
df_point.reset_index(inplace = True, drop = True)


gain_made = 0
loss_made = 0
for i, row in df_point.iterrows():
    if(i == 0):
        continue
    diff = df_point.loc[i, 'elevation'] - df_point.loc[i-1, 'elevation']
    if(diff >=0):
        gain_made += diff
        df_point.loc[i, 'elevationGainMade'] = gain_made
        df_point.loc[i, 'elevationGainLoss'] = loss_made
    else:
        loss_made += abs(diff)
        df_point.loc[i, 'elevationGainLoss'] = loss_made
        df_point.loc[i, 'elevationGainMade'] = gain_made

remaining_elev = []
for j, r in df_point.iterrows():
    rem = gain_made - df_point.loc[j, 'elevationGainMade']
    remaining_elev.append(rem)
df_point['elevationRemainingGain'] = remaining_elev
df_point.loc[0,'elevationRemainingGain'] = gain_made
df_point.loc[0,'elevationGainLoss'] = 0
df_point.loc[0,'elevationGainMade'] = 0


#df_point['navigation'] = nav

#clusters = []
#for cluster, crow in df_point.iterrows():
#    if( ('IN' in df_point.loc[cluster, 'name'].split('-')) | ('OUT' in df_point.loc[cluster, 'name'].split('-'))):
#        clusters.append('Cluster')
#    else:
#        clusters.append('Single')
#df_point['bundle'] = clusters
file_name = input('Name of the file:')
df_point.to_excel('{}.xlsx'.format(file_name))
