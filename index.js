const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-1-uhu2.onrender.com']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Schema & Model
const nameSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { collection: 'names' });

const Name = mongoose.model('Name', nameSchema);

// POST route to save name
app.post('/api/name', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const saved = await Name.create({ name });
    res.status(201).json({
      message: `Thank you, ${name}!`,
      data: saved // includes _id and name
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ message: "Error saving name" });
  }
});

// GET route to fetch all names
app.get('/api/name', async (req, res) => {
  try {
    const names = await Name.find();
    res.json(names);
  } catch (err) {
    console.error('❌ Error fetching names:', err.message);
    res.status(500).json({ message: "Error fetching names" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



/*
PS D:\my-first-live-site\server> node index
[dotenv@16.6.0] injecting env (2) from .env
Server running on port 5000
MongoDB Connected
============
https://www.krishnashukla.com/lander

-----------------
POST/GET  http://localhost:5000/api/name

{
  "name": "Krishna Shuklaaaa"
}
  {
    "message": "Thank you, Krishna Shuklaaaa!",
    "data": {
        "name": "Krishna Shuklaaaa",
        "_id": "685e00d6c8646de9d9931f94",
        "__v": 0
    }
}
------------------
live backend---> https://backend-hpok.onrender.com/api/name

*/