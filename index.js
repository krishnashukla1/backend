const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Name = mongoose.model('Name', new mongoose.Schema({ name: String }));

app.post('/api/name', async (req, res) => {
  const { name } = req.body;
  await Name.create({ name });
  res.json({ message: `Thank you, ${name}!` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
PS D:\my-first-live-site\server> node index
[dotenv@16.6.0] injecting env (2) from .env
Server running on port 5000
MongoDB Connected
============
https://www.krishnashukla.com/lander
------------------

*/