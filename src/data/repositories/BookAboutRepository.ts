import {IBookAbout} from '../../models/IBook';
import uuid from 'react-native-uuid';
import AbstactRepository from './AbstractRepository';
import BookAbout from '../entities/BookAbout';
import bookAboutRepository from './BookRepository';
interface WebSQLRows {
  _array: BookAbout[];
  length: number;
}
class BookAboutRepository extends AbstactRepository {
  addBookAbout = async (bookAbout: IBookAbout): Promise<void> => {
    try {
      const {
        authors,
        desc,
        image,
        isbn13,
        language,
        pages,
        price,
        publisher,
        rating,
        subtitle,
        title,
        year,
        url,
      } = bookAbout;
      const {length} = await this.getBookAboutByIsbn13(isbn13);
      if (!length) {
        await this.execute(
          `INSERT OR REPLACE INTO book_about (
          id,
          authors,
          desc,
          image,
          isbn13,
          language,
          pages,
          price,
          publisher,
          rating,
          subtitle,
          title,
          year,
          url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            uuid.v4() as string,
            authors,
            desc,
            image,
            isbn13,
            language,
            pages,
            price,
            publisher,
            rating,
            subtitle,
            title,
            year,
            url,
          ],
        );
        const result = await this.getBookAboutByIsbn13(isbn13);
        await bookAboutRepository.updateBookById(isbn13, result._array[0].id);
      }
    } catch (error) {
      console.log('addBookAboutError', error);
    }
  };

  getBookAboutById = async (id: string): Promise<BookAbout> => {
    try {
      const result = await this.execute(
        'SELECT * FROM book_about WHERE id = ?',
        [id],
      );
      return result[1].rows._array[0];
    } catch (error) {
      console.log('getBookAboutByIdError', error);
    }
  };

  getBookAboutByIsbn13 = async (isbn13: string): Promise<WebSQLRows> => {
    try {
      const result = await this.execute(
        'SELECT * FROM book_about WHERE isbn13 = ?',
        [isbn13],
      );
      return result[1].rows;
    } catch (error) {
      console.log('getBookAboutByIsbn13Error', error);
    }
  };

  deleteBookAboutById = async (id: string): Promise<void> => {
    try {
      await this.execute('DELETE FROM book_about WHERE id = ?', [id]);
    } catch (error) {
      console.log('deleteBookAboutByIdError', error);
    }
  };
}

export default new BookAboutRepository();
