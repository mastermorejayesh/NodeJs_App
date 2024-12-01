require('dotenv').config(); // Load .env variables
const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2/promise');
const port = 3000;
const pool = require('./db'); // Import the MySQL connection file

const app = express();

// Load environment variables
//const DB_HOST = process.env.DB_HOST || 'localhost';
//const DB_USER = process.env.DB_USER || 'jayesh';
//const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
//const DB_NAME = process.env.DB_NAME || 'testdb';

app.use(bodyParser.urlencoded({ extended: true }));

//const pool = mysql.createPool({
//  host: DB_HOST,
//  user: DB_USER,
//  password: DB_PASSWORD,
//  database: DB_NAME,
//});

app.get('/', async (req, res) => {
  try {
    // Query the database
    const [rows] = await pool.query('SELECT * FROM users');

    // Start building the HTML response
    let html = `
      <html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
    <title>Jayesh More</title>
    <style>

    </style>
  </head>
  <body>
    <h1 >Data Fetch MySQL</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>`;

    // Add each row to the table body
    rows.forEach(row => {
      html += `
        <tr>
          <th>${row.id}</th>
          <td>${row.name}</td>
          <td>${row.email}</td>
        </tr>`;
    });

    // Close the table
    html += `
          </tbody>
        </table>
        <h2>Insert New User</h2>
        <form action="/add-user" method="POST" id="emailForm">
          <label for="name"></label>
          <input type="text" id="name" name="name" class="form-control" placeholder="Name" aria-label="Recipient's username" aria-describedby="basic-addon2" required>
          <label for="email"></label>
          <input type="text" id="email" name="email" class="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" required>
          <br><br>
          <button type="submit">Add User</button>
        </form>
      </body>
      <script>
const emailField = document.getElementById('email');
  const emailForm = document.getElementById('emailForm');

  emailForm.addEventListener('submit', (event) => {
    let emailValue = emailField.value.trim();

    // Auto-append @example.com if needed
    if (!emailValue.includes('@')) {
      emailValue += '@example.com';
      emailField.value = emailValue;
    }
  });
      </script>
      </html>
    `;

    // Send the HTML response
    res.send(html);
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle form submissions
app.post('/add-user', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Insert data into the database
    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    console.log(`User added: ${name}, ${email}`);

    // Redirect back to the homepage
    res.redirect('/');
  } catch (error) {
    console.error('Database insertion error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

