import http.client
import pandas as pd
import requests
import time
import numpy as np

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': token,
    }

def get_team_ids():
    
        '''
        League IDs
        39 Premier League
        61 Ligue 1
        78 Bundesliga
        135 Serie A
        140 La Liga
        2 UEFA Champions League
        94 Primeira Liga
        88 Eredivisie
        3 UEFA Europa League
    
        '''

        league_list = [39,61,78,135,140,2,94,88,3]
        season_list = [2022,2021,2020]
        output = pd.DataFrame()
        for i in league_list:
            for j in season_list:
                time.sleep(0.5)
                url_league = 'https://v3.football.api-sports.io/standings?league={0}&season={1}'.format(i,j)
                res = requests.get(url_league, headers=headers)

                temp = pd.json_normalize(res.json()['response']).explode(['league.standings'])
                temp = pd.json_normalize(temp.explode(['league.standings'])['league.standings'])[['team.id', 'team.name','group']]
                temp['league_id'] = i
                temp['season'] = j
                temp.rename(columns={'team.id':'team_id','team.name':'team_name','group':'league_name'},inplace=True)
                output = pd.concat([output, temp])
                print('league #', i, ', season ', j, ' was downloaded')
        return output
    
def get_squad(team_id_df):
    output = pd.DataFrame()
    for i in team_id_df.team_id.values:
        squad_url = 'https://v3.football.api-sports.io/players/squads?team={0}'.format(i)
        time.sleep(0.5)
        res = requests.get(squad_url, headers=headers)
        temp = pd.json_normalize(pd.json_normalize(res.json()['response']).explode('players').players)[['id','name','age','position']]
        temp['team_id'] = i
        print('team #', i, ' was downloaded')
        output = pd.concat([output, temp])
    return output

# pulling teams and squads lists
team_id_df = get_team_ids()
team_id_df.to_csv('league_list.csv',index=False)
player_id_df = get_squad(team_id_df)
player_id_df.to_csv('teams_list.csv',index=False)

# selecting only top 7 leagues team players:
team_id_df = team_id_df[team_id_df.league_id.isin([39, 61, 78, 135, 140, 94, 88])].drop_duplicates('team_id')
player_id_df = player_id_df[player_id_df.team_id.isin(team_id_df.team_id)].drop_duplicates('id')
player_id_df.rename(columns={'id':'player.id'},inplace=True)
print('players number to pull: ', player_id_df['player.id'].value_counts().sum())


# pulling player statistics:
team_players_df = pd.DataFrame()
season_list = [2022,2021,2020]
player_id_request_list = player_id_df['player.id'].drop_duplicates().values
counter = 0
for i in player_id_request_list:
    for j in season_list:
        player_id = i
        season = j
        time.sleep(0.5)
        url_player = 'https://v3.football.api-sports.io/players?id={0}&season={1}'.format(player_id, season)
        res = requests.get(url_player, headers=headers)
        if len(res.json()['response']) > 0:
            player_df = pd.json_normalize(res.json()['response'][0]['statistics'])
            player_df['player.id'] = player_id
            player_df['league.season'] = season
            player_df['player.nationality'] = res.json()['response'][0]['player']['nationality']
            player_df['player.height'] = res.json()['response'][0]['player']['height']
            player_df['player.weight'] = res.json()['response'][0]['player']['weight']

            player_df.loc[player_df['games.captain'] == True, 'games.captain'] = 1
            player_df.loc[player_df['games.captain'] == False, 'games.captain'] = 0
            player_df['tournaments'] = 1
            player_df = player_df[player_df['team.id'].isin(team_id_df.team_id)]
            static_variables = ['player.id','league.season',#'team.id','team.name',
                                'player.nationality', 'player.height', 'player.weight']
            dynamic_variables = ['games.appearences', 'games.lineups', 'games.minutes', 'games.number',
                   'games.rating', 'games.captain', 'substitutes.in','tournaments',
                   'substitutes.out', 'substitutes.bench', 'shots.total', 'shots.on',
                   'goals.total', 'goals.conceded', 'goals.assists', 'goals.saves',
                   'passes.total', 'passes.key', 'passes.accuracy', 'tackles.total',
                   'tackles.blocks', 'tackles.interceptions', 'duels.total', 'duels.won',
                   'dribbles.attempts', 'dribbles.success', 'dribbles.past', 'fouls.drawn',
                   'fouls.committed', 'cards.yellow', 'cards.yellowred', 'cards.red',
                   'penalty.won', 'penalty.commited', 'penalty.scored', 'penalty.missed',
                   'penalty.saved']
            column_list = player_df.columns.values
            for k in column_list: 
                player_df.loc[player_df[k] == None, k] = 0
                player_df.loc[player_df[k].isnull(), k] = 0

            player_df[dynamic_variables] = player_df[dynamic_variables].astype(float)
            player_df = player_df.groupby(static_variables, as_index=False)[dynamic_variables].sum()
            team_players_df = pd.concat([team_players_df, player_df])
        if (counter/200) % 1 == 0:
            counter = counter + 1
            print(counter, 'players were uploaded:')
            print('-----------------------------')
        else:
            counter = counter + 1
        
team_players_df = team_players_df.groupby(static_variables, as_index=False)[dynamic_variables].sum()        
team_players_df['games.rating'] = team_players_df['games.rating'] / team_players_df.tournaments