import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001; // Fixed port for backend

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wtwr_db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Continuing without database - using mock data');
  });

// Item Schema
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weather: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

// Mock data (fallback when MongoDB is not available)
const mockItems = [
  {
    _id: "999",
    name: "Beanie",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Beanie.png?etag=bc10497cc80fa557f036e94f9999f7b2",
    owner: null,
    likes: [],
  },
  {
    _id: "1",
    name: "Boot",
    weather: "cold", 
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png?etag=0953a2ea59f1c6ebc832fabacdc9c70e",
    owner: null,
    likes: [],
  },
  {
    _id: "3",
    name: "Coat",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    owner: null,
    likes: [],
  },
  {
    _id: "5", 
    name: "Hoodie",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    owner: null,
    likes: [],
  }
];

// Routes
// GET /items - Get all clothing items
app.get('/items', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // MongoDB is connected
      const items = await Item.find({});
      res.json(items);
    } else {
      // Use mock data
      res.json(mockItems);
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /items - Create new clothing item
app.post('/items', async (req, res) => {
  try {
    const { name, imageUrl, weather } = req.body;
    
    if (!name || !imageUrl || !weather) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (mongoose.connection.readyState === 1) {
      // MongoDB is connected
      const newItem = new Item({ name, imageUrl, weather });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } else {
      // Mock response
      const newItem = {
        _id: Date.now().toString(),
        name,
        imageUrl, 
        weather,
        owner: null,
        likes: [],
        createdAt: new Date(),
      };
      mockItems.push(newItem);
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /items/:itemId - Delete clothing item
app.delete('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    if (mongoose.connection.readyState === 1) {
      // MongoDB is connected
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } else {
      // Mock delete
      const itemIndex = mockItems.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
      mockItems.splice(itemIndex, 1);
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Items API: http://localhost:${PORT}/items`);
});