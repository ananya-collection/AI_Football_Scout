const socketIO = require('socket.io');
const request = require('request');

const shortlist = new Set();
let nofificationList = [];
let nofificationListReaded = [];
let queriesStatic;

const initializeSocket = (server) => {
    const io = socketIO(server);

    // Manage shortlist data and socket events here

    // Use a Set to store unique player IDs

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for the 'addToShortlist' event
        socket.on('addToShortlist', (playerId) => {
            // Add the player ID to the shortlist
            shortlist.add(playerId);

            // Broadcast the updated shortlist to all connected clients
            io.emit('shortlistUpdated', Array.from(shortlist)); // Convert Set to Array
        });

        socket.on('viewShortlist', () => {
            // Add the player ID to the shortlist
            // Broadcast the updated shortlist to all connected clients
            console.log("emited shortlist")
            io.emit('shortlistView', Array.from(shortlist)); // Convert Set to Array
        });

        socket.on('clearShortlist', () => {
            console.log("cleared")
            shortlist.clear()
            io.emit('shortlistCleared', Array.from(shortlist))
        })

        // socket for unread messages
        let socketHeaders = socket.handshake.headers
        socket.on('queriesAlert', () => {
            setInterval(() => {
                request.get({ url: 'http://localhost:3000/api/getuserrequests', headers: socketHeaders },
                    function (error, response, anotherThing) {
                        let queries = JSON.parse(anotherThing).data;
                        if ((queries / 5 - Math.floor(queries / 5) == 0) && (queriesStatic !== queries)) {
                            let notifyId = Math.round(new Date() / 1000);
                            nofificationList.push({ notifyId: notifyId, queries: queries })
                            queriesStatic = queries;
                        };
                        io.emit('queriesAlertAmount', nofificationList);
                    });
            }, 5000);
        });

        // socket for readed messages
        socket.on('queriesAlertReaded', (readObj) => {
            let dublicates = 0;
            if (typeof readObj === 'undefined')
                io.emit('queriesAlertAmountReaded', nofificationListReaded);
            else {
                if (nofificationListReaded.lenght === 0)
                    dublicates = 0;
                else {
                    nofificationListReaded.forEach(function (value) {
                        if (value.notifyId === readObj.notifyId) {
                            dublicates++
                        }
                    });
                }
                if (dublicates === 0) {
                    nofificationListReaded.push(readObj)
                    io.emit('queriesAlertAmountReaded', nofificationListReaded);
                    nofificationList = nofificationList.filter(x => x === readObj)
                }
            }
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};

module.exports = { initializeSocket, shortlist };