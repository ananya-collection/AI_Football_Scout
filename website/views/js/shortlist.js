const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const shortlistButton = document.getElementById('shortlistButton');

    // Function to update the button text with the shortlist count
    function updateButtonCount(count) {
        shortlistButton.textContent = `Current Shortlist(${count})`;
    }

    // Set the initial count on page load
    const initialCount = getShortlistCountFromStorage();
    updateButtonCount(initialCount);
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
    // Update the UI to display the updated shortlist
    // For example, you can populate a list or update a badge with the count.

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

    // Emit a socket event named 'shortlistButtonClicked'
    console.log("button clicked")
    socket.emit('viewShortlist');
}


// Function to update the button text with the shortlist count
function updateButtonCount(count) {
    shortlistButton.textContent = `Current Shortlist (${count})`;
}

