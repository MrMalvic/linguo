const url = 'mongodb://localhost:3000'; // Replace with your MongoDB connection string
const dbName = 'mydatabase'; // Replace with your database name

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully');

  const db = client.db(dbName);

  // Perform database operations here

  client.close();
});
