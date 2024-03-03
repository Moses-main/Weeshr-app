// models/book.model.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  isbn: string;
}
