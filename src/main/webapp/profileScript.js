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
    loadPrevStatus();
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
