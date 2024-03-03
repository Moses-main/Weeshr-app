// routes/category.routes.ts

import express, { Request, Response } from "express";
import { Category } from "../models/category.model";

const router = express.Router();

// Sample data for demonstration
let categories: Category[] = [
  { id: "1", name: "Category 1", description: "Description of Category 1" },
  { id: "2", name: "Category 2", description: "Description of Category 2" },
];

// Get all categories
router.get("/", (req: Request, res: Response) => {
  res.json(categories);
});

// Get a category by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
});

// Create a new category
router.post("/", (req: Request, res: Response) => {
  const newCategory: Category = req.body;
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Update an existing category
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedCategory: Category = req.body;
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }
  categories[index] = { ...updatedCategory, id };
  res.json(categories[index]);
});

// Delete a category
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }
  categories.splice(index, 1);
  res.json({ message: "Category deleted successfully" });
});

export default router;
