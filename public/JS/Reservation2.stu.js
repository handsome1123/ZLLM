
// Retrieve data from localStorage
var objectives = ["-", "Meeting", "Research / Doing Project", "Studying", "Watching Movies"];



// Function to populate select elements
function populateSelect(selectElement, options) {
    options.forEach(function (option, index) {
        var optionElement = document.createElement("option");
        optionElement.value = index + 1; // Index starts from 0, so add 1 to make it 1-based
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Populate the objective select element
populateSelect(document.getElementById("objectiveSelect"), objectives);

// fetch data that user selected 
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomName = urlParams.get('room_name');
    const time = urlParams.get('time');
    
    document.getElementById('roomName').value = roomName;
    document.getElementById('time').value = time;
    
}

    // Function to format date as "DD Month YYYY" e.g., "02 April 2024"
    function formatDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return day + " " + month + " " + year;
    }

    // Get the current date
    var currentDate = new Date();

    // Format the current date
    var formattedDate = formatDate(currentDate);

    // Display the formatted date
    document.querySelector('.namesystemDate').textContent = formattedDate;


    localStorage.setItem('formattedDate', formattedDate);

