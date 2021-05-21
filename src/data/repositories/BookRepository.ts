import {IBook} from '../../models/IBook';
import uuid from 'react-native-uuid';
import AbstactRepository from './AbstractRepository';
import Book from '../entities/Book';
interface WebSQLRows {
  _array: Book[];
  length: number;
}
class BookRepository extends AbstactRepository {
  addBook = async (book: IBook): Promise<void> => {
    try {
      const {title, subtitle, price, image, isbn13} = book;
      const {length} = await this.getBookByIsbn13(isbn13);
      if (!length) {
        await this.execute(
          `INSERT OR REPLACE INTO books (
            id,
            title, 
            subtitle,
            price,
            image,
            isbn13
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [uuid.v4() as string, title, subtitle, price, image, isbn13],
        );
      }
    } catch (error) {
      console.log('addBookError', error);
    }
  };

  getBookByIsbn13 = async (isbn13: string): Promise<WebSQLRows> => {
    try {
      const result = await this.execute(
        'SELECT * FROM books WHERE isbn13 = ?',
        [isbn13],
      );
      return result[1].rows;
    } catch (error) {
      console.log('getBookByIsbn13Error', error);
    }
  };

  getAllBooks = async (): Promise<Book[]> => {
    try {
      const result = await this.execute('SELECT * FROM books', []);
      return result[1].rows._array;
    } catch (error) {
      console.log('getAllBooksError', error);
    }
  };

  deleteBookById = async (id: string): Promise<void> => {
    try {
      await this.execute('DELETE FROM books WHERE id = ?', [id]);
    } catch (error) {
      console.log('deleteBookByIdError', error);
    }
  };

  getBooksBySearchString = async (searchString: string): Promise<Book[]> => {
    try {
      const result = await this.execute(
        `SELECT
          *
        FROM books
          WHERE INSTR(lower(title), lower('${searchString}')) OR INSTR(lower(subtitle), lower('${searchString}'))`,
        [],
      );
      return result[1].rows._array;
    } catch (error) {
      console.log('getBooksBySearchStringError', error);
    }
  };

  updateBookById = async (isbn13: string, about: string): Promise<void> => {
    try {
      await this.execute('UPDATE books SET about = ? WHERE isbn13 = ?', [
        about,
        isbn13,
      ]);
    } catch (error) {
      console.log('getBookAboutByIsbn13Error', error);
    }
  };
}

export default new BookRepository();
