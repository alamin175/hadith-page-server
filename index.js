const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to SQLite database
const db = new sqlite3.Database('hadith_db.db', err => {
	if (err) {
		console.error('Error connecting to SQLite database:', err.message)
	} else {
		console.log('Connected to SQLite database')
	}
})

app.get('/api/books', (req, res) => {
	db.all('SELECT * FROM books', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})
app.get('/api/chapter', (req, res) => {
	db.all('SELECT * FROM chapter', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/api/chapter/:id', (req, res) => {
	const chapterId = req.params.id
	db.get('SELECT * FROM chapter WHERE id = ?', [chapterId], (err, row) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			if (row) {
				res.json(row)
			} else {
				res.status(404).json({ error: 'Chapter not found' })
			}
		}
	})
})

app.get('/api/hadith', (req, res) => {
	db.all('SELECT * FROM hadith', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/api/section', (req, res) => {
	db.all('SELECT * FROM section', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

// Add more routes to access data from other tables...

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
