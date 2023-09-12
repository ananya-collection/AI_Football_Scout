from sklearn.cluster import KMeans
import pandas as pd
import requests
import time
import numpy as np

positions_list = ['Attacker','Defender','Midfielder','Goalkeeper']
ages_list = [ '20-23 age','24-30 age', 'age above 30', 'age below 20']

attacker_rating_list = ['games.minutes','goals.total','shots.on','goals.assists','dribbles.success','passes.key']
midfielder_rating_list = ['games.minutes','tackles.interceptions','duels.won','goals.assists','dribbles.success','passes.key']
defender_rating_list = ['games.minutes','tackles.interceptions','duels.won','tackles.blocks','passes.total','passes.key']
goalkeeper_rating_list = ['games.minutes','goals.saves','penalty.saved','passes.total']

final_cluster = pd.DataFrame()
for m in positions_list:
    for n in ages_list:
        kmeans = KMeans(n_clusters=5, n_init=20)
        y_pred_kmeans = kmeans.fit_predict(final[dynamic_variables][(final.position == m) & (final.age_group == n)])
        final.loc[(final.position == m) & (final.age_group == n), 'predictions'] = kmeans.labels_
        print(m, ' ', n , ' ' , '# samples: ', len(kmeans.labels_))
        temp = pd.DataFrame(kmeans.cluster_centers_, columns=final[dynamic_variables].columns)
        temp['age_group'] = n
        temp['position'] = m
        temp_columns = []
        if m == 'Attacker':
            column_list = attacker_rating_list
        if m == 'Midfielder':
            column_list = midfielder_rating_list
        if m == 'Defender':
            column_list = defender_rating_list
        if m == 'Goalkeeper':
            column_list = goalkeeper_rating_list
        for p in temp[column_list].columns:
            temp = temp.sort_values(p)
            temp['rating_' + p] = temp.groupby('games.number').cumcount() / 4
            temp_columns.append('rating_' + p)
        temp['rating'] = temp[temp_columns].sum(axis=1)
        temp.drop(temp_columns, axis=1, inplace=True)
        temp = temp.sort_values('rating')
        temp = temp.reset_index().rename(columns={'index':'predictions'})
        temp.loc[0:1,'player_category'] = 'lowAppereances'
        temp.loc[1:2,'player_category'] = 'belowAverage'
        temp.loc[2:3,'player_category'] = 'average'
        temp.loc[3:4,'player_category'] = 'prospective'
        temp.loc[4:,'player_category'] = 'top'
        final_cluster = pd.concat([final_cluster, temp])
final.predictions = final.predictions.astype(int)
final = final.merge(final_cluster[['age_group','position','player_category','predictions']], on=['age_group','position','predictions'], how='left')