// routes/book.routes.ts

import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

const router = express.Router();

// Sample data for demonstration
let books: Book[] = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    category: "Category 1",
    publicationYear: 2020,
    isbn: "1234567890",
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    category: "Category 2",
    publicationYear: 2021,
    isbn: "0987654321",
  },
];

// Get all books
router.get("/", (req: Request, res: Response) => {
  res.json(books);
});

// Get a book by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// Create a new book
router.post("/", (req: Request, res: Response) => {
  const newBook: Book = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update an existing book
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedBook: Book = req.body;
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books[index] = { ...updatedBook, id };
  res.json(books[index]);
});

// Delete a book
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
});

export default router;
