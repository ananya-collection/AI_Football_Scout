const { Server } = require('socket.io');
const request = require('request');

module.exports = {
    getSocket: (server) => {
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        io.on('connection', (socket) => {
            let queriesStatic;
            setInterval(() => {
                let socketHeaders = socket.handshake.headers
                request.get({ url: 'http://localhost:3000/api/getuserrequests', headers: socketHeaders },
                    function (error, response, anotherThing) {
                        let queries = JSON.parse(anotherThing).data;
                        if ((queries / 5 -  Math.floor(queries / 5) == 0) && (queriesStatic !== queries)) {
                            socket.emit('userQueries', queries);
                            queriesStatic = queries; 
                        };
                    });
            }, 5000);

        });
        return io;
    }
}
