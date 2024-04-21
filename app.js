const express = require('express');
const con = require('./config/db');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Use bodyParser middleware to parse application/json
app.use(bodyParser.json());

// Check database connection
con.connect(function (err) {
    if (err) {
        console.log('Error Database connecting ');
        return;
    }
    console.log('Connected to database!');
});

// set the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- get all products for user --------------
app.get('/student/room', function (req, res) {
    const sql = `
    SELECT room.room_name, time_slots.*
    FROM room
    LEFT JOIN time_slots ON room.room_id = time_slots.room_id
`;
    con.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send("Database server error");
        }
        res.json(results);
    });
});


app.get('/student/reservation2', function (_req, res) {
    res.sendFile(path.join(__dirname, 'views/stu/Reservation2.stu.html'));
});

app.get('/student/reservation1', function (_req, res) {
    res.sendFile(path.join(__dirname, 'views/stu/Reservation1.stu.html'));
});

// Define your /student/booking POST route
app.post('/student/booking', (req, res) => {
    // Retrieve form data
    const roomName = req.body.roomName;
    const time = req.body.time;
    const objective = req.body.objective;

    // Assuming you are using MySQL
    const sql = "INSERT INTO booking (user_id, book_id, booking_date, return_date, status) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, [req.session.userID, bookID, bookingDate, returnDate, "pending"], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error while booking');
            return;
        }
        console.log("Booking record inserted");
        res.send('Booking successful!');
    });

    // Example response
    res.json({
        message: 'Booking successful',
        roomName: roomName,
        time: time,
        objective: objective
    });
});

// ------------ register route ----------
app.get('/register', function (_req, res) {
    res.sendFile(path.join(__dirname, 'views/Register.html'));
});

// ------------ root service ----------
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, 'views/Login.html'));
});

const PORT = 8000;
app.listen(PORT, function (req, res) {
    console.log('Server is running .....');
})