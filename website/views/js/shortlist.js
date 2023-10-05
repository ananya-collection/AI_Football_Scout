const socket = io();

socket.on('initialCount', (initialCount) => {
    console.log('Initial count received from server:', initialCount);
  
    updateButtonCount(initialCount);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const shortlistButton = document.getElementById('shortlistButton');
  

    socket.emit('getInitialCount');
  });

function addToShortList(playerId) {
    // Emit a socket event to the server with the player ID
    socket.emit('addToShortlist', playerId);
}

function clearShortlist(){
    console.log("clear")
    socket.emit('clearShortlist');
}

socket.on('shortlistUpdated', (shortlist) => {

    count = shortlist.length
    console.log('Shortlist updated:', shortlist);
    localStorage.setItem('shortlistCount', count);
    updateButtonCount(count)
    
    
});

socket.on('shortlistCleared', ((shortlist) => {
    count = shortlist.length
    console.log('Shortlist cleared:', shortlist);
    localStorage.setItem('shortlistCount', count);
    updateButtonCount(count)
}))


function getShortlistCountFromStorage() {
    return parseInt(localStorage.getItem('shortlistCount')) || 0;
}


const shortlistButton = document.getElementById('shortlistButton');

shortlistButton.addEventListener('click',emitShortlistEvent)

function emitShortlistEvent() {

    console.log("button clicked")
    socket.emit('viewShortlist');
}

function updateButtonCount(count) {
    shortlistButton.textContent = `Current Shortlist (${count})`;
}

function clearShortlistCounter(){
    localStorage.setItem('shortlistCount', 0);
}
































