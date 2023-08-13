const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 3001;

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for storing images
const ImageSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
});

const Image = mongoose.model('Image', ImageSchema);

// Fetch and save images from Unsplash API
app.get('/fetch-images', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        count: 6,
        client_id: process.env.UNSPLASH_API_KEY,
        query: 'movies',
      },
    });

    console.log(response)

    const images = response.data.map(item => ({
      title: item.alt_description,
      imageUrl: item.urls.regular, // Store a higher resolution version if needed
      category: 'movies',
    }));

    await Image.insertMany(images);

    res.status(200).json({ message: 'Images saved successfully' });
  } catch (error) {
    // console.error('Error fetching and saving images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve images
app.get('/images/:imageId', async (req, res) => {
  try {
    const image = await Image.findById(req.params.imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
