document.addEventListener("DOMContentLoaded", function () {
    // Get the gameId from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("gameId");

    if (!gameId) {
        alert("Game ID is missing!");
        return;
    }

    // Retrieve games from local storage
    let savedGames = JSON.parse(localStorage.getItem("games")) || [];
    
    // Find the game with the given gameId
    const game = savedGames.find(g => g.id === gameId);

    if (!game) {
        alert("Game not found!");
        return;
    }

    // Set the quiz name and time limit
    console.log(game.name)
    document.getElementById("quiz-label").innerHTML = game.name || "Untitled";
    document.getElementById("quiz-time-limit").innerHTML = game.timeLimit || 40; // Default 40s if not set
});
