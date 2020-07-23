function getCurrentUserInfo() {
    fetch('/user').then(response => response.json()).then((userInfo) => {
        //(Object.keys(userInfo).length) == 0
        if (getCookie("user") == "") {
            window.open("login.html", "_self");
        } else {
            const currentName = document.getElementById('current-name');
            const theName = document.createElement('p');
            theName.innerText = userInfo.name;
            currentName.appendChild(theName);
            const currentUsername = document.getElementById('current-username');
            const theUsername = document.createElement('p');
            theUsername.innerText = userInfo.username;
            currentUsername.appendChild(theUsername);
        }
    });
    loadPrevStatus();
    checkStatus();
}

function loadPrevStatus() {
    if (localStorage.getItem('myCheckbox') != null) {
        if (localStorage.getItem('myCheckbox') == "checked") {
            const lastVolunteeringStatus = document.getElementById('neutral-volunteering-status-btn');
            lastVolunteeringStatus.style.display = "none";
            const volunteeringStatus = document.getElementById('interested-volunteering-status-btn');
            volunteeringStatus.style.display = "block";
            const checkbox = document.getElementById('myCheck');
            checkbox.checked = true;
        } else {
            const lastVolunteeringStatus = document.getElementById('interested-volunteering-status-btn');
            lastVolunteeringStatus.style.display = "none";
            const volunteeringStatus = document.getElementById('neutral-volunteering-status-btn');
            volunteeringStatus.style.display = "block";
        }
    }
}

$(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                console.log("Checkbox is checked.");
                localStorage.setItem('myCheckbox', 'checked');
                const lastVolunteeringStatus = document.getElementById('neutral-volunteering-status-btn');
                lastVolunteeringStatus.style.display = "none";
                const volunteeringStatus = document.getElementById('interested-volunteering-status-btn');
                volunteeringStatus.style.display = "block";
            }
            else if($(this).prop("checked") == false){
                console.log("Checkbox is unchecked.");
                localStorage.setItem('myCheckbox', 'unchecked');
                const lastVolunteeringStatus = document.getElementById('interested-volunteering-status-btn');
                lastVolunteeringStatus.style.display = "none";
                const volunteeringStatus = document.getElementById('neutral-volunteering-status-btn');
                volunteeringStatus.style.display = "block";
            }
        });
    });

    function logoutFeature() {
        var logoutButton = document.getElementById('logout-login');
        logoutButton.addEventListener("click", logout);
    }

    function checkStatus() {
        fetch('/user').then(response => response.json()).then((userInfo) => {
            if ((Object.keys(userInfo).length) == 0) {
                const itemText = document.getElementById('text-part');
                itemText.textContent = "Login";
            } else {
                const itemText = document.getElementById('text-part');
                itemText.textContent = "Logout";
            }
        });
        logoutFeature();
    }

    function logout() {
        fetch('/user').then(response => response.json()).then((userInfo) => {
            const itemText = document.getElementById('text-part');
            if (((itemText.textContent) == "Logout") && ((Object.keys(userInfo).length) != 0)) {
                console.log(document.cookie);
                // document.cookie = 'user'+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                // document.cookie = 'id'+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                console.log(document.cookie);
                itemText.textContent = "Login";
                window.open("login.html", "_self");
            } else if (((itemText.textContent) == "Login") && ((Object.keys(userInfo).length) == 0)) {
                window.open("login.html", "_self");
            }
        });
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