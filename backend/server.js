import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/wtwr_db";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    console.log("Continuing without database - using mock data");
  });

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    weather: { type: String, required: true },
    imageUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

// Mock data (fallback when MongoDB is not available)
const mockItems = [
  {
    _id: "999",
    name: "Beanie",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Beanie.png?etag=bc10497cc80fa557f036e94f9999f7b2",
    owner: null,
    likes: [],
  },
  {
    _id: "1",
    name: "Boot",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png?etag=0953a2ea59f1c6ebc832fabacdc9c70e",
    owner: null,
    likes: [],
  },
  {
    _id: "3",
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    owner: null,
    likes: [],
  },
  {
    _id: "5",
    name: "Hoodie",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    owner: null,
    likes: [],
  },
];

app.get("/items", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Item.find({});
      res.json(items);
    } else {
      res.json(mockItems);
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { name, imageUrl, weather } = req.body;

    if (!name || !imageUrl || !weather) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (mongoose.connection.readyState === 1) {
      const newItem = new Item({ name, imageUrl, weather });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } else {
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
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    if (mongoose.connection.readyState === 1) {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    } else {
      const itemIndex = mockItems.findIndex((item) => item._id === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
      }
      mockItems.splice(itemIndex, 1);
      res.json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Schema (for authentication)
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

let mockUsers = [];
let mockUserId = 1;

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const newUser = new User({ name, email, password, avatar: avatar || "" });
      const savedUser = await newUser.save();

      res.status(201).json({
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          avatar: savedUser.avatar,
        },
        token: `mock-token-${savedUser._id}`,
      });
    } else {
      const existingUser = mockUsers.find((user) => user.email === email);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const newUser = {
        _id: mockUserId++,
        name,
        email,
        password,
        avatar: avatar || "",
        createdAt: new Date(),
      };
      mockUsers.push(newUser);

      res.status(201).json({
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        },
        token: `mock-token-${newUser._id}`,
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token: `mock-token-${user._id}`,
      });
    } else {
      // Mock response
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token: `mock-token-${user._id}`,
      });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const userId = token.replace("mock-token-", "");

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    } else {
      const user = mockUsers.find((u) => u._id.toString() === userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    }
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/users/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const userId = token.replace("mock-token-", "");
    const { name, avatar, email } = req.body;

    if (mongoose.connection.readyState === 1) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, avatar, email },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });
    } else {
      const userIndex = mockUsers.findIndex((u) => u._id.toString() === userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      mockUsers[userIndex] = { ...mockUsers[userIndex], name, avatar, email };
      const user = mockUsers[userIndex];

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    }
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Items API: http://localhost:${PORT}/items`);
});
