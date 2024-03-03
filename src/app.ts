// app.ts

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bookRoutes from "./routes/book.routes";
import authorRoutes from "./routes/author.routes";
import categoryRoutes from "./routes/category.routes";
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000; // Default port is 3000, but you can change it

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb://localhost:27017/weeshr_app";
const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();

app.use(
  cors({
    origin: "http://example.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
