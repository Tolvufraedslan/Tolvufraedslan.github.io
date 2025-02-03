require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Fetch all courses
app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register a user for a course
app.post('/enroll', async (req, res) => {
    const { user_id, course_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO registrations (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [user_id, course_id]
        );
        res.json({ message: 'User enrolled successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
