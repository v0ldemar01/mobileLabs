import axios from 'axios';
import {IAboutBook, IBook} from '../models/IBook';

const BOOK_API_URL = 'https://api.itbook.store/1.0/';

export const getBooksByFilter = async (
  filter: string,
  page?: number,
): Promise<IBook[]> => {
  try {
    const url = `${BOOK_API_URL}search/${filter}?page=${page}`;
    const res = await axios(url);
    return (res as any).data.books ?? [];
  } catch (err) {
    console.log(err);
    return [] as IBook[];
  }
};

export const getBookByIsbn13 = async (isbn13: string): Promise<IAboutBook> => {
  try {
    const url = `${BOOK_API_URL}books/${isbn13}`;
    const res = await axios(url);
    return res.data as any;
  } catch (err) {
    console.log(err);
    return {} as IAboutBook;
  }
};
