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
        for (i = 0; i < titlesList.length; i++) {
            titlesListElement.appendChild(createListElement(titlesList[i]));
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

function createListElement(text) {
  const element = document.createElement('li');
  element.innerText = text;
  return element;
}
