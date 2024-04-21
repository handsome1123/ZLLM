// get room from database
async function getRoom() {
    try {
        const response = await fetch('/student/room');
        if (response.ok) {
            const data = await response.json();
            showRoom(data);
        }
        else if (response.status == 500) {
            const data = await response.text();
            throw Error(data);
        }
        else {
            throw Error('Connection error');
        }
    } catch (err) {
        console.error(err.message);
        Notiflix.Report.failure('Error', err.message, 'Close');
    }
}

function showRoom(data) {
    const tbody = document.querySelector('#tbody');
    let temp = "";
    data.forEach(function(room) {
        temp += "<tr>";
        temp += `<th>${room.room_name}</th>`;
        temp += `<th>${room.time}</th>`;
        if (room.status === 'free') {
            temp += `<td><a href="/student/reservation2?room_name=${room.room_name}&time=${room.time}" class="text-success">${room.status}</a></td>`;

        } else if (room.status === 'reserved'){
            temp += `<td class="text-danger">${room.status}</td>`;
        }
         else if (room.status === 'disabled'){
        temp += `<td class="text-secondary">${room.status}</td>`;
         }
        else if (room.status === 'pending'){
        temp += `<td class="text-primary">${room.status}</td>`;
        }
        temp += `</tr>`;
    });
    tbody.innerHTML = temp;
}


function bookRoom(roomName) {
    // Implement booking functionality here
    console.log(`Room "${roomName}" booked`);
}


// get room 
getRoom();


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
