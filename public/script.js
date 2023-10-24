// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById("clock");
    const currentTime = new Date().toLocaleTimeString();
    clockElement.innerText = currentTime;
}

// Function to handle background image upload
function handleBackgroundImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
}

// Function to customize the greeting
function customizeGreeting() {
    const newGreeting = prompt("Speak your mind...");
    if (newGreeting !== null) {
        document.getElementById('greeting').innerText = newGreeting;
    }
}

// Function to fetch and populate time zone options
function fetchTimeZones() {
    fetch('http://localhost:4000/timezones')
        .then((response) => response.json())
        .then((data) => {
            const dropdown = document.getElementById('timezone-dropdown');
            data.forEach((timezone) => {
                const option = document.createElement('option');
                option.value = timezone;
                option.textContent = timezone;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching time zones:', error);
        });
}

// Function to update the clock based on selected time zone
function updateClockBasedOnTimeZone() {
    const selectedTimeZone = document.getElementById('timezone-dropdown').value;
    fetch(`http://localhost:4000/current-time?timeZone=${selectedTimeZone}`)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('clock').textContent = data.time;
        })
        .catch((error) => {
            console.error('Error fetching current time:', error);
        });
}

// Update the clock every second
setInterval(updateClock, 1000);

// Event listeners
document.getElementById("background-upload").addEventListener("change", handleBackgroundImageUpload);
document.getElementById("greeting").addEventListener("click", customizeGreeting);
document.getElementById("timezone-dropdown").addEventListener("change", updateClockBasedOnTimeZone);

// Initial setup
fetchTimeZones();  // Fetch time zones when the page loads
updateClockBasedOnTimeZone();  // Update the clock based on the selected time zone
