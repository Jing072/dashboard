console.log("Home loaded");

// Variabelen
const welcomeText = document.querySelector('.welcome-text');
const scheduleUrl = "/schedule";
const scheduleChart = document.querySelector(".schedule-chart");

// Fetch naar /schedule data
fetch(scheduleUrl)
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData[0]);
        const d = myData[0];

        // Chart
        new Chart(scheduleChart, {
            // Type grafiek
            type: "doughnut",
            data: {
                // Label voor de vakken
                labels: d.subjects,
                // Labels en data
                datasets: [
                    {
                        label: "Vakken",
                        data: d.hours,
                    },
                ],
            },
        });
    });

// Fetch voor login
fetch("/loggedIn")
    .then((response) => {
        if (response.status === 401) {
            throw new Error("AUTHENTICATION_FAIL");
        }
        if (response.status === 403) {
            throw new Error("AUTHORISATION_FAIL");
        }
        return response;
    })
    .then((loginData) => loginData.json())
    .then((loginJsonData) => showLoginInformation(loginJsonData))
    .catch((error) => {
        if (error.message === "AUTHENTICATION_FAIL") {
            window.location.href = "/not_authenticated.html";
        }
        if (error.message === "AUTHORISATION_FAIL") {
            window.location.href = "/not_authorised.html";
        }
    });

function showLoginInformation(loginInfo) {
    if (loginInfo.loggedInUser) {
        welcomeText.textContent = "Welcome " + loginInfo.loggedInUser;
    }
}
