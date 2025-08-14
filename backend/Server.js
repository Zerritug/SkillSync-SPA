const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./DataBaseSkill');
const bodyparser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS now");
    res.json(rows[0]);
  } catch (err) {
    console.error("Conexión fallida", err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});


//routes
const lessons = require('./routes/lessons.js');
app.use('/api/lessons', lessons);


// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
