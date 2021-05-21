import axios from 'axios';
import {IBookAbout, IBook} from '../models/IBook';
import bookRepository from '../data/repositories/BookRepository';
import bookAboutRepository from '../data/repositories/BookAboutRepository';

const BOOK_API_URL = 'https://api.itbook.store/1.0/5656565565';

export const getBooksByFilter = async (
  filter: string,
  page?: number,
): Promise<IBook[]> => {
  const url = `${BOOK_API_URL}search/${filter}?page=${page}`;
  const res = await axios(url);
  const {books} = (res as any).data;
  for (const book of books) {
    await bookRepository.addBook(book);
  }
  return (res as any).data.books ?? [];
};

export const getBookByIsbn13 = async (isbn13: string): Promise<IBookAbout> => {
  const url = `${BOOK_API_URL}books/${isbn13}`;
  const res = await axios(url);
  const bookAbout = res.data as any;
  await bookAboutRepository.addBookAbout(bookAbout);
  return bookAbout;
};
