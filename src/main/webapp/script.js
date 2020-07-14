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
            titlesListElement.appendChild(createDivElement(titlesList[i], startDatesList[i],
             contextsList[i], urlsList[i]));
        }
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
console.log("This is the blobstore url"+getBlobstoreUrl() );

function createDivElement(initiativeTitle, initiativeStart, initiativeContext, initiativeImage) {
  const currentCard = document.createElement('div');
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
  currTitle.innerText = initiativeTitle;
  currTitle.style.fontFamily = "'Roboto', sans-serif";
  currTitle.style.fontWeight = "bolder";
  currTitle.style.textTransform = "uppercase";
  currTitle.style.fontSize = "90%";
  currStartDate.innerText = initiativeStart;
  currStartDate.style.fontFamily = "'Roboto', sans-serif";
  currStartDate.style.fontSize = "80%";
  currContext.innerText = initiativeContext;
  currContext.style.fontFamily = "'Roboto', sans-serif";
  currContext.style.fontSize = "80%";
  currContext.style.marginRight = "12px";
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
