import pandas as pd
import numpy as np

inp = input('Name of the file:')
if(inp.split('.')[1] == 'xlsx'):
    course = pd.read_excel('{}'.format(inp))
else:
    course = pd.read_csv('{}'.format(inp))



elev_diff = [course.loc[0, 'altitude']]
gain_made = 0
loss_made = 0
for i, row in course.iterrows():
    if(i == 0):
        continue
    diff = course.loc[i, 'altitude'] - course.loc[i-1, 'altitude']
    if(diff >=0):
        gain_made += diff
        course.loc[i, 'elevationGainMade'] = gain_made
        course.loc[i, 'elevationGainLoss'] = loss_made
    else:
        loss_made += abs(diff)
        course.loc[i, 'elevationGainLoss'] = loss_made
        course.loc[i, 'elevationGainMade'] = gain_made

remaining_elev = []
for j, r in course.iterrows():
    rem = gain_made - course.loc[j, 'elevationGainMade']
    remaining_elev.append(rem)
course['elevationRemainingGain'] = remaining_elev

namec = input('Name:')
course.to_excel('{}.xlsx'.format(namec))
