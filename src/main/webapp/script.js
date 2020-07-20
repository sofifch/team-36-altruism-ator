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
        for (i = 0; i < titlesList.length; i++) {
            cardCount++;
            titlesListElement.appendChild(createDivElement(cardCount, titlesList[i], startDatesList[i],
             contextsList[i], urlsList[i]));
        }
        cardEnlargement(cardCount);
    });
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
 initiativeContext, initiativeImage) {
  const currentCard = document.createElement('div');
  currentCard.id = "card" + cardCount;
  const currStartDate = document.createElement('p');
  const currTitle = document.createElement('p');
  const currContext = document.createElement('p');
  const currImage = document.createElement('img');
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
    var cloneTitle = theTitle.cloneNode(theTitle);
    var cloneImage = theImage.cloneNode(theImage);
    var cloneStart = theStart.cloneNode(theStart);
    var cloneContext = theContext.cloneNode(theContext);
    const titlePlaceholder = document.getElementById('initiative-overlay-title');
    const imagePlaceholder = document.getElementById('initiative-overlay-image');
    const startPlaceholder = document.getElementById('initiative-overlay-start-date');
    const contextPlaceholder = document.getElementById('initiative-overlay-context');
    titlePlaceholder.innerHTML = '';
    imagePlaceholder.innerHTML = '';
    startPlaceholder.innerHTML = '';
    contextPlaceholder.innerHTML = '';
    titlePlaceholder.appendChild(cloneTitle);
    imagePlaceholder.appendChild(cloneImage);
    startPlaceholder.appendChild(cloneStart);
    contextPlaceholder.appendChild(cloneContext);
    open();
}

function open() {
    document.getElementById('initiative-overlay').style.width = "100%";
}

function close() {
    document.getElementById('initiative-overlay').style.width = "0%";
}
