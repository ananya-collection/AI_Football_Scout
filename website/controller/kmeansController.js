let aiCollectionInput = require('../model/kmeans.js')
var bson = require('bson');
const kmeans = require('node-kmeans');


// football players KPIs list
const cluserKpis = ['games_appearences', 'games_lineups', 'games_minutes', 'games_number', 'games_rating',
    'games_captain', 'substitutes_in', 'tournaments', 'substitutes_out', 'substitutes_bench',
    'shots_total', 'shots_on', 'goals_total', 'goals_conceded', 'goals_assists', 'goals_saves',
    'passes_total', 'passes_key', 'passes_accuracy', 'tackles_total', 'tackles_blocks', 'tackles_interceptions',
    'duels_total', 'duels_won', 'dribbles_attempts', 'dribbles_success', 'dribbles_past', 'fouls_drawn',
    'fouls_committed', 'cards_yellow', 'cards_yellowred', 'cards_red', 'penalty_won',
    'penalty_commited', 'penalty_scored', 'penalty_missed', 'penalty_saved'];

// index of key KPIs for each footballer position
const attackerKpis = [2, 12, 11, 14, 25, 17];
const midfielderKpis = [2, 21, 23, 14, 25, 17]
const defenderKpis = [2, 21, 23, 20, 16, 17]
const goalkeeperKpis = [2, 15, 36, 16]


async function getPrediction(req, res) {
    let position = 'Attacker'; // req.body
    let ageGroup = '24-30 age'; // req.body
    let playerCategory = 'top' // prospective, average, belowAverage, lowAppereances
    let request = { 'position': { '$eq': position }, 'age_group': { '$eq': ageGroup } }
    aiCollectionInput.getDataForPrediction(request, (err, result) => {
        if (!err) {


            // JUST A PROTOTYPE, TO BE REFACTORED ACCORDING to MVC

            // Data set pre-processing
            let vectors = new Array();
            for (let i = 0; i < result.length; i++) {
                var sub_vectors = []
                for (var k = 0; k < cluserKpis.length; k++) {
                    sub_vectors.push(result[i][cluserKpis[k]])
                }
                vectors[i] = sub_vectors;
            }

            // Klusteting data set
            kmeans.clusterize(vectors, { k: 5 }, (err, res) => {
                if (!err) {

                    // convering cenroids into rating values
                    var rating = {};
                    for (var i = 0; i < 5; i++) {
                        rating['cluster' + i] = (attackerKpis.map(x => Math.round(res[i].centroid[x] * 100) / 100));
                    }
                    for (var m = 0; m < rating.cluster0.length; m++) {
                        subrating = [];
                        for (var i = 0; i < 5; i++) {
                            subrating.push(rating['cluster' + i][m]);
                        }
                        subrating.sort();
                        for (var i = 0; i < 5; i++) {
                            for (var j = 0; j < 5; j++) {
                                if (rating['cluster' + i][m] === subrating[j]) {
                                    rating['cluster' + i][m] = Math.round(j / 4 * 100) / 100;
                                }
                            }
                        }
                    }
                    for (var s = 0; s < 5; s++) {
                        rating['cluster' + s] = rating['cluster' + s].reduce((a, b) => a + b, 0);
                    }

                    // get class rating summing each KPI rating and label it to frontent variable
                    rating_final = []
                    for (u = 0; u < 5; u++) {
                        rating_final.push(rating['cluster' + u])
                    }
                    rating_final.sort()
                    for (u = 0; u < 5; u++) {
                        if (rating['cluster' + u] === rating_final[0])
                            rating['cluster' + u] = 'lowAppereances'
                        else if (rating['cluster' + u] === rating_final[1])
                            rating['cluster' + u] = 'belowAverage'
                        else if (rating['cluster' + u] === rating_final[2])
                            rating['cluster' + u] = 'average'
                        else if (rating['cluster' + u] === rating_final[3])
                            rating['cluster' + u] = 'prospective'
                        else if (rating['cluster' + u] === rating_final[4])
                            rating['cluster' + u] = 'top'
                    }
                    clustered = {}
                    for (var i = 0; i < 5; i++) {
                        clustered[rating['cluster' +i]] = res[i].clusterInd;
                    }
                    console.log(clustered)
                };
            });
            res.json({ statusCode: 201, data: test, message: 'success' });
        }

    });
};


module.exports = { getPrediction }
