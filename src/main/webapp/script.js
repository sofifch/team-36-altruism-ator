// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
var cardCount = 0;

function getMessage() {
    getBlobstoreUrl();
    fetch('/data').then(response => response.json()).then((fullList) => {
        const titlesListElement = document.getElementById('titles-container');
        titlesListElement.innerHTML = '';
        var titlesList = fullList[0];
        var contextsList = fullList[4];
        var startDatesList = fullList[2];
        var urlsList = fullList[8];
        var locationsList = fullList[1];
        var causesList = fullList[5];
        var audiencesList = fullList[6];
        var instructionsList = fullList[7];
        for (i = 0; i < titlesList.length; i++) {
            cardCount++;
            titlesListElement.appendChild(createDivElement(cardCount, titlesList[i], startDatesList[i],
             contextsList[i], urlsList[i], locationsList[i], causesList[i], audiencesList[i],
             instructionsList[i]));
        }
        cardEnlargement(cardCount);
    });
    checkStatus();
}

function getBlobstoreUrl() {
    fetch('/my-blobstore-url').then((response) => {
        return response.text();
    })
    .then((imageUploadUrl) => {
        const myForm = document.getElementById('newInitiativeForm');
        myForm.action = imageUploadUrl;
        myForm.classList.remove('hidden');
      });
}

console.log(getBlobstoreUrl());

function createDivElement(cardCount,initiativeTitle, initiativeStart,
 initiativeContext, initiativeImage, initiativeLocation, initiativeCause, initiativeAudience, 
 initiativeInstructions) {
  const currentCard = document.createElement('div');
  currentCard.id = "card" + cardCount;
  const currStartDate = document.createElement('p');
  const currTitle = document.createElement('p');
  const currContext = document.createElement('p');
  const currImage = document.createElement('img');
  const currLocation = document.createElement('p');
  const currCause = document.createElement('p');
  const currAudience = document.createElement('p');
  const currInstructions = document.createElement('p');
  currLocation.innerText = initiativeLocation;
  currLocation.id = "the-location" + "card" + cardCount;
  currLocation.style.display = "none";
  currAudience.innerText = initiativeAudience;
  currAudience.id = "the-audience" + "card" + cardCount;
  currAudience.style.display = "none";
  currInstructions.innerText = initiativeInstructions;
  currInstructions.id = "the-instructions" + "card" + cardCount;
  currInstructions.style.display = "none";
  currCause.innerText = initiativeCause;
  currCause.id = "the-cause" + "card" + cardCount;
  currCause.style.display = "none";
  currImage.src = initiativeImage;
  currImage.style.width = "85px";
  currImage.style.height = "80px";
  currImage.style.float = "left";
  currImage.style.marginTop = "25px";
  currImage.style.marginLeft = "15px";
  currImage.style.marginRight = "13px";
  currImage.id = "the-image" + "card" + cardCount;
  currTitle.innerText = initiativeTitle;
  currTitle.style.fontFamily = "'Roboto', sans-serif";
  currTitle.style.fontWeight = "bolder";
  currTitle.style.textTransform = "uppercase";
  currTitle.style.fontSize = "90%";
  currTitle.id = "the-title" + "card" + cardCount;
  currStartDate.innerText = initiativeStart;
  currStartDate.style.fontFamily = "'Roboto', sans-serif";
  currStartDate.style.fontSize = "80%";
  currStartDate.id = "the-start" + "card" + cardCount;
  currContext.innerText = initiativeContext;
  currContext.style.fontFamily = "'Roboto', sans-serif";
  currContext.style.fontSize = "80%";
  currContext.style.marginRight = "12px";
  currContext.id = "the-context" + "card" + cardCount;
  currentCard.style.backgroundColor = "#E5E5E5";
  currentCard.style.width = "300px";
  currentCard.style.height = "130px";
  currentCard.style.borderRadius = "11px";
  currentCard.style.padding = "12px";
  currentCard.style.marginBottom = "20px";
  currentCard.appendChild(currImage);
  currentCard.appendChild(currTitle);
  currentCard.appendChild(currStartDate);
  currentCard.appendChild(currContext);
  currentCard.appendChild(currLocation);
  currentCard.appendChild(currCause);
  currentCard.appendChild(currAudience);
  currentCard.appendChild(currInstructions);
  return currentCard;
}

function cardEnlargement(cardCount) {
    console.log(cardCount);
    for (j = 1; j <= cardCount; j++) {
        console.log("card-enlargement-call");
        var currCardEvent = document.getElementById("card" + j);
        currCardEvent.addEventListener("mouseover", myHoverFunction);
        currCardEvent.addEventListener("click", myClickFunction);
        currCardEvent.addEventListener("mouseout", myMouseOutFunction);
    }
}

function myHoverFunction() {
    this.style.border = "2px solid black";
}

function myMouseOutFunction() {
    this.style.border = "0px";
}

function myClickFunction() {
    var theTitle = document.getElementById('the-title'+ this.id);
    var theImage = document.getElementById('the-image' + this.id);
    var theStart = document.getElementById('the-start' + this.id);
    var theContext = document.getElementById('the-context' + this.id);
    var theLocation = document.getElementById('the-location' + this.id);
    var theCause = document.getElementById('the-cause' + this.id);
    var theAudience = document.getElementById('the-audience' + this.id);
    var theInstructions = document.getElementById('the-instructions' + this.id);
    var cloneTitle = theTitle.cloneNode(theTitle);
    var cloneImage = theImage.cloneNode(theImage);
    cloneImage.style.width = "250px";
    cloneImage.style.height = "250px";
    var cloneStart = theStart.cloneNode(true);
    var cloneContext = theContext.cloneNode(true);
    var cloneLocation = theLocation.cloneNode(true);
    var cloneCause = theCause.cloneNode(true);
    var cloneAudience = theAudience.cloneNode(true);
    var cloneInstructions = theInstructions.cloneNode(true);
    cloneLocation.style.display = "inline";
    cloneCause.style.display = "inline";
    cloneAudience.style.display = "inline";
    cloneInstructions.style.display = "inline";
    const titlePlaceholder = document.getElementById('initiative-overlay-title');
    const imagePlaceholder = document.getElementById('initiative-overlay-image');
    const startPlaceholder = document.getElementById('initiative-overlay-start-date');
    const contextPlaceholder = document.getElementById('initiative-overlay-context');
    const locationPlaceholder = document.getElementById('initiative-overlay-location');
    const causePlaceholder = document.getElementById('initiative-overlay-cause');
    const audiencePlaceholder = document.getElementById('initiative-overlay-audience');
    const instructionsPlaceholder = document.getElementById('initiative-overlay-instructions');
    titlePlaceholder.innerHTML = '';
    imagePlaceholder.innerHTML = '';
    startPlaceholder.innerHTML = '';
    contextPlaceholder.innerHTML = '';
    locationPlaceholder.innerHTML = '';
    causePlaceholder.innerHTML = '';
    audiencePlaceholder.innerHTML = '';
    instructionsPlaceholder.innerHTML = '';
    titlePlaceholder.appendChild(cloneTitle);
    imagePlaceholder.appendChild(cloneImage);
    startPlaceholder.appendChild(cloneStart);
    contextPlaceholder.appendChild(cloneContext);
    locationPlaceholder.appendChild(cloneLocation);
    causePlaceholder.appendChild(cloneCause);
    audiencePlaceholder.appendChild(cloneAudience);
    instructionsPlaceholder.appendChild(cloneInstructions);
    openOverlay();
}

function openOverlay() {
    document.getElementById('initiative-overlay').style.width = "100%";
}

function close() {
    document.getElementById('initiative-overlay').style.width = "0%";
}

function checkStatus() {
    if (getCookie("user") == "") {
        const itemText = document.getElementById('text-part');
        itemText.textContent = "Login";
    } else {
        const itemText = document.getElementById('text-part');
        itemText.textContent = "Logout";
    }
    logoutFeature();
}

function logoutFeature() {
    var logoutButton = document.getElementById('logout-login');
    logoutButton.addEventListener("click", logout);
}

function logout() {
    const itemText = document.getElementById('text-part');
    if (((itemText.textContent) == "Logout") && (getCookie("user") != "")) {
        document.cookie = 'user'+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'id'+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        itemText.textContent = "Login";
        window.open("login.html", "_self");
    } else if (((itemText.textContent) == "Login") && (getCookie("user") == "")) {
        console.log("its happening");
        window.open("login.html", "_self");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function userNeededForSubmission() {
    checkStatus();
    console.log("running");
    if (getCookie("user") == "") {
        document.getElementById('submit-new-initiative').addEventListener("click",
        function(event) {
            event.preventDefault();
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        });
    }
}
