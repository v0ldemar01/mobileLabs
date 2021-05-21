export interface IBook {
  id?: string;
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  about?: string;
}
export interface IBookAbout {
  authors: string;
  desc: string;
  image: string;
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
