// server.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const discussionRoutes = require('./routes/discussionRoutes');
const reclamationRoutes = require("./routes/reclamations");




require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

connectDB()
  .then(() => console.log('Database ready'))
  .catch(err => console.error(err));

// Routes
app.use('/', authRoutes);
app.use('/tickets', ticketRoutes); 
app.use("/reclamations", reclamationRoutes);

//app.use('/discussion', discussionRoutes(db));


// Example protected route
const verifyToken = require('./middleware/authMiddleware');
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});




app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
