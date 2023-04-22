const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// SQLite database setup
const dbPath = './characters.db'; // Specify the path to your SQLite database file
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log(`Connected to the SQLite database at ${dbPath}`);
});

// Create a table for characters
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      class TEXT,
      level INTEGER,
      race TEXT
    )
  `);
});

// Character creation endpoint
app.post('/api/characters', (req, res) => {
  // Extract character data from request body
  const { name, characterClass, level, race, imgURL } = req.body;

  // Insert character data into the characters table
  db.run(`
    INSERT INTO characters (name, class, level, race)
    VALUES (?, ?, ?, ?)
  `, [name, characterClass, level, race, imgURL], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to create character');
    } else {
      console.log(`Character with ID ${this.lastID} created`);
      res.status(201).send(`Character with ID ${this.lastID} created`);
    }
  });
});

// Character retrieval endpoint
app.get('/api/characters/:id', (req, res) => {
  // Extract character ID from URL parameter
  const characterId = req.params.id;

  // Retrieve character data from the characters table
  db.get(`
    SELECT * FROM characters WHERE id = ?
  `, [characterId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to retrieve character');
    } else if (!row) {
      res.status(404).send('Character not found');
    } else {
      console.log(`Character with ID ${row.id} retrieved`);
      res.status(200).json(row);
    }
  });
});

app.get('/api/characters', (req, res) => {
  const sql = 'SELECT * FROM characters';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
      return;
    }
    res.json(rows);
  });
});


const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

