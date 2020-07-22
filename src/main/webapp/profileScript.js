function getCurrentUserInfo() {
    fetch('/user').then(response => response.json()).then((userInfo) => {
        const currentName = document.getElementById('current-name');
        const theName = document.createElement('p');
        theName.innerText = userInfo.name;
        currentName.appendChild(theName);
        const currentUsername = document.getElementById('current-username');
        const theUsername = document.createElement('p');
        theUsername.innerText = userInfo.username;
        currentUsername.appendChild(theUsername);
    });
}

function updateVolunteeringStatus() {
    var checkbox = document.getElementById('myCheck');
    if (checkbox.checked == true) {
        console.log("checked");
    } else {
        console.log("not checked");
    }
}
