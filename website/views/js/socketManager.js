const socketIO = require('socket.io');

const shortlist = new Set();

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
    
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};

module.exports = { initializeSocket,shortlist};