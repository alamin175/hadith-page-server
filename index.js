const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(
	cors({
		origin: 'http://localhost:3000', // Your Next.js app's URL
		credentials: true, // If your app sends cookies with requests
	})
)

// Connect to SQLite database
const db = new sqlite3.Database('hadith_db.db', err => {
	if (err) {
		console.error('Error connecting to SQLite database:', err.message)
	} else {
		console.log('Connected to SQLite database')
	}
})

app.get('/', (req, res) => {
	res.send('All Hadis data are coming ')
})

app.get('/books', (req, res) => {
	db.all('SELECT * FROM books', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/books/:id', (req, res) => {
	const booksId = req.params.id
	db.get('SELECT * FROM books WHERE id = ?', [booksId], (err, row) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			if (row) {
				res.json(row)
			} else {
				res.status(404).json({ error: 'Books not found' })
			}
		}
	})
})

app.get('/chapter', (req, res) => {
	db.all('SELECT * FROM chapter', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/chapter/:id', (req, res) => {
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

app.get('/hadith', (req, res) => {
	db.all('SELECT * FROM hadith', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/hadith/:id', (req, res) => {
	const bookId = req.params.id
	db.all('SELECT * FROM hadith WHERE book_id = ?', [bookId], (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/section', (req, res) => {
	db.all('SELECT * FROM section', (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

app.get('/section/:book_id', (req, res) => {
	const bookId = req.params.book_id
	db.all('SELECT * FROM section WHERE book_id = ?', [bookId], (err, rows) => {
		if (err) {
			console.error('Error executing SQL query:', err.message)
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(rows)
		}
	})
})

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
