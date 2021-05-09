export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}
export interface IAboutBook {
  authors: string;
  desc: string;
  image: string;
  isbn10: string;
  isbn13: string;
  language: string;
  pages: string;
  price: string;
  publisher: string;
  rating: string;
  subtitle: string;
  title: string;
  url: string;
  year: string;
  error?: string;
}
