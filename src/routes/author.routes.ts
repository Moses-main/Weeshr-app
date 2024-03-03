// routes/author.routes.ts

import express, { Request, Response } from "express";
import { Author } from "../models/author.model";

const router = express.Router();

// Sample data for demonstration
let authors: Author[] = [
  { id: "1", name: "John Doe", biography: "John Doe is a prolific writer." },
  {
    id: "2",
    name: "Jane Smith",
    biography: "Jane Smith is an award-winning author.",
  },
];

// Get all authors
router.get("/", (req: Request, res: Response) => {
  res.json(authors);
});

// Get an author by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const author = authors.find((a) => a.id === id);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.json(author);
});

// Create a new author
router.post("/", (req: Request, res: Response) => {
  const newAuthor: Author = req.body;
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Update an existing author
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedAuthor: Author = req.body;
  const index = authors.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Author not found" });
  }
  authors[index] = { ...updatedAuthor, id };
  res.json(authors[index]);
});

// Delete an author
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = authors.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Author not found" });
  }
  authors.splice(index, 1);
  res.json({ message: "Author deleted successfully" });
});

export default router;
