const { ObjectId } = require('mongodb');
let client = require('../dbConnection.js');
const kmeans = require('node-kmeans');
let aiCollectionInput = client.db('AIFootballScout').collection('AiModelDataInput');
let aiCollectionOutput = client.db('AIFootballScout').collection('UserAiRequests');


console.log("You successfully connected to AIFootballScout Collection!");


async function getDataForPrediction(request, callback) {
    callback = await aiCollectionInput.find(request).toArray(callback)
    return callback
}

function convertDataForPrediction(request) {
    // convering mongoDB output into vectors
    let vectors = new Array();
    for (let i = 0; i < request.length; i++) {
        var sub_vectors = []
        for (var k = 0; k < cluserKpis.length; k++) {
            sub_vectors.push(request[i][cluserKpis[k]])
        }
        vectors[i] = sub_vectors;
    }
    return vectors;
}


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
const goalkeeperKpis = [2, 17, 13, 15, 36, 16]

function getPrediction(request) {
    return new Promise((resolve, reject) => {
        kmeans.clusterize(request, { k: 5 }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function convertPrediction(request, playerCategory) {

    // convering cenroids into rating values
    var rating = {};
    var targetKpis;
    if (playerCategory === 'Attacker')
        targetKpis = attackerKpis;
    else if (playerCategory === 'Midfielder')
        targetKpis = midfielderKpis;
    else if (playerCategory === 'Defender')
        targetKpis = defenderKpis;
    else if (playerCategory === 'Goalkeeper')
        targetKpis = goalkeeperKpis;


    for (var i = 0; i < 5; i++) {
        rating['cluster' + i] = (targetKpis.map(x => Math.round(request[i].centroid[x] * 100) / 100));
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
        rating_final.push({ cluster: u, value: rating['cluster' + u], clusterId: 'cluster' + u })
    }

    rating_final.sort(function (a, b) {
        return a.value - b.value;
    });

    rating_final[0]['description'] = 'lowAppereances'
    rating_final[1]['description'] = 'belowAverage'
    rating_final[2]['description'] = 'average'
    rating_final[3]['description'] = 'prospective'
    rating_final[4]['description'] = 'top'

    for (w = 0; w < 5; w++) {
        for (v = 0; v < 5; v++) {
            if (rating_final[w].clusterId === rating_final[v].clusterId)
                {rating[rating_final[w].clusterId] = rating_final[v].description
                }
        }
    }

    var clustered = {}
    for (var i = 0; i < 5; i++) {
        clustered[rating['cluster' + i]] = request[i].clusterInd;
    }
    return clustered
};


function insertAiRequest(request, callback) {
    aiCollectionOutput.insertOne(request, callback);
}

function deleteRecords(request, callback) {
    aiCollectionOutput.deleteMany(request, callback);
}

async function findRecords(request) {
    // find record which was created by unit tests
    try {
        let recordsToDelete = await aiCollectionOutput.find({}).sort({ requestId: -1 }).limit(parseInt(request)).toArray();
        return recordsToDelete
    } catch (error) {
        throw error;
    }
}

async function getPlayerStats(request) {
    try {
        //console.log(request);
        const player = await aiCollectionInput.find({ _id: ObjectId(request) }).toArray();
        //console.log("player is ", player);
        return player;
    } catch (error) {
        throw error;
    }
}

async function getQueryHistory(request) {
    try {
        //console.log(request);
        const query = await aiCollectionOutput.find().toArray();
        //console.log("query is ", query);
        return query;
    } catch (error) {
        throw error;
    }
}

async function getQueryHistoryRows(request) {
    try {
        //console.log(request);
        const query = await aiCollectionOutput.find().toArray();
        console.log("query length is ", query.length);
        return query.length;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDataForPrediction, convertDataForPrediction, getPrediction,
    convertPrediction, insertAiRequest, getPlayerStats, getQueryHistory,
    deleteRecords, findRecords, getQueryHistoryRows
}