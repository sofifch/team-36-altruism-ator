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

function loadMessage() {
  checkStatus();
  if (getCookie("user") == "") {
    document.getElementById("inboxStatus").innerHTML = "Please login to view messages.";
  } else {
    getMessage();
  }
}

async function getMessage() {
    const response = await fetch('/message');
    const messages = await response.json();
    const table = document.getElementById("viewMessages");
    messages.forEach((message) => {
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2)
      cell1.innerHTML = message.timeStamp;
      cell2.innerHTML = message.sender;
      cell3.innerHTML = message.message;
    });
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
        document.cookie = 'user2'+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
