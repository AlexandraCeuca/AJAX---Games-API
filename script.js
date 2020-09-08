var baseUrl = new URL (" https://games-world.herokuapp.com");
var gamesData= [];

getGames("/fdsfsdfds");

function getGames(endpoint) {

hideErrorMessage(); 
displayLoader();


fetch(baseUrl.href+endpoint, { method: "GET" })
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonResp) {
        console.log(jsonResp);
        hideLoader();
        gamesData=jsonResp;
        displayGames();
    if (jsonResp.error) {
        displayError(jsonResp.error);
    }
   })
   .catch(function (error) {
    hideLoader();
    displayError(error);
   })

}

function displayGames(){
    const gamesContainer = document.getElementById("gamesContainer");
    for(let i=0; i<gamesData.length; i++){
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("gameContainer");
        const gameTitle = document.createElement("h1");
        gameTitle.innerHTML = gamesData[i].title;
        gameContainer.appendChild(gameTitle);
        const gameImage = document.createElement("img");
        gameImage.src = gamesData[i].imageUrl;
        gameContainer.appendChild(gameImage);
        gamesContainer.appendChild(gameContainer);
        const gameDescription = document.createElement("p");
        gameDescription.innerHTML = gamesData[i].description;
        gameContainer.appendChild(gameDescription);
    }
}

function displayError(error) {
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.style.position = "relative";
    const errorText = document.createElement("div");
    errorText.style.marginBottom = "20px";
    console.log(error);
    errorText.innerHTML = "UPS:O Error: Something went wrong :(";
    errorDiv.appendChild(errorText);
    const retryButton = document.createElement("button");
    retryButton.id = "retryButton";
    retryButton.innerHTML = "Feeling lucky";
    retryButton.addEventListener("click", function () {getGames("games")});
    errorDiv.appendChild(retryButton);
    errorDiv.style.display = "block";
  }

function displayLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    var flexContainer = document.getElementsByClassName("flex-container")[0];
    flexContainer.style.opacity = 0.5;
    loader.style.display = "block";
}
  
function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    var flexContainer = document.getElementsByClassName("flex-container")[0];
    flexContainer.style.opacity = 1;
    loader.style.display = "none";
}
function hideErrorMessage() {
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.style.display = "none";
}
  