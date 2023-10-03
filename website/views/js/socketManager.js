const socketIO = require('socket.io');
const request = require('request');

const shortlist = new Set();
let nofificationList = [];
let nofificationListReaded = [];
let queriesStatic;

const initializeSocket = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected');


        socket.on('addToShortlist', (playerId) => {

            shortlist.add(playerId);

            // Broadcast the updated shortlist to all connected clients
            io.emit('shortlistUpdated', Array.from(shortlist)); 
        });

        socket.on('viewShortlist', () => {
            
            
            console.log("emited shortlist")
            // Broadcast the shortlist to all connected clients
            io.emit('shortlistView', Array.from(shortlist)); 
        });

        socket.on('clearShortlist', () => {
            console.log("cleared")
            shortlist.clear()
            // Broadcast the cleared shortlist to all connected clients
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