// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
let db;

async function connectDB() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('reclamAUTH');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error('Database not connected');
  return db;
}

module.exports = { connectDB, getDB };
