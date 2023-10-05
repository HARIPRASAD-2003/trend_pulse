import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';


// MongoDB Atlas connection URL
const connection_url = 'mongodb+srv://hariprasad2021:hariprasad2021@trend-pulse-server.ape0ztn.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoDB client
mongoose.connect(connection_url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => {console.log(`server running on port ${port}`)}))
    .catch((err) => console.log(err.message))


  // Define routes and start the server
  app.get('/', (req, res) => {
    res.send('Hello, World! MongoDB is connected.');
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
