const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MongoClient_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    return client.db("recap");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
