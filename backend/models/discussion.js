// models/Discussion.js
const { ObjectId } = require('mongodb');

class Discussion {
  constructor(db) {
    this.collection = db.collection('discussions');
  }

  async create(ticketId, sender, message) {
    const discussion = {
      ticketId,
      messages: [{ sender, message, date: new Date().toISOString() }]
    };
    const result = await this.collection.insertOne(discussion);
    return { _id: result.insertedId, ...discussion };
  }

  async getByTicket(ticketId) {
    return await this.collection.find({ ticketId }).toArray();
  }

  async addMessage(discussionId, sender, message) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(discussionId) },
      { $push: { messages: { sender, message, date: new Date().toISOString() } } }
    );
    return result.modifiedCount;
  }
}

module.exports = Discussion;
