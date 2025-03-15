var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perezoptical',
});

var server = app.listen(4548, function () {
    console.log("Server started on port 4548");
});

con.connect(function (error) {
    if (error) console.log(error);
    else console.log("Database connected");
});


app.get('/users', function (req, res) {
    con.query('SELECT * FROM users', function (error, rows) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Database error", error });
        } else {
            res.json(rows);
        }
    });
});

// Register Process
app.post('/register', async function (req, res) {
    console.log("Received Body:", req.body);

    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must have at least 1 uppercase letter, 1 number, and be at least 6 characters long.",
        });
    }

    try {
       
        con.query("SELECT * FROM users WHERE email = ?", [email], async function (error, results) {
            if (error) {
                console.log("Database Error:", error);
                return res.status(500).json({ message: "Database error", error });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: "Email is already in use!" });
            }

         
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)";
            con.query(sql, [name, email, hashedPassword], function (error, result) {
                if (error) {
                    console.log("Database Error:", error);
                    return res.status(500).json({ message: "Registration failed", error });
                }
                return res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
});
// Login Process
app.post('/login', (req, res) => {
    

    if (!req.body || Object.keys(req.body).length === 0) {
        console.log("ERROR: Request body is empty or malformed");
        return res.status(400).json({ message: "Invalid request - No data received" });
    }

    const { email, password } = req.body;
    
    

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    
    con.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(" Database Error:", error);
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        const user = results[0];

      
        bcrypt.compare(password, user.hashedPassword, (err, passwordMatch) => {
            if (err) {
                console.log(" Bcrypt Error:", err);
                return res.status(500).json({ message: "Server error" });
            }
            if (!passwordMatch) {
                return res.status(400).json({ message: "Incorrect password!" });
            }

          
            return res.status(200).json({ message: "Login successful!", userId: user.id });
        });
    });
});
