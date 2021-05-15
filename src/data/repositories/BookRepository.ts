import {EntityRepository, Repository} from 'typeorm';
import {Book} from '../entities/Book';
import {IBook} from '../../models/IBook';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  addBook(book: IBook): Promise<Book> {
    return this.create(book).save();
  }

  getBookByIsbn13(isbn13: string): Promise<Book> {
    return this.findOne({where: {isbn13}}) as Promise<Book>;
  }

  async deleteBook(isbn13: string): Promise<Book> {
    const book = await this.getBookByIsbn13(isbn13);
    return this.remove(book);
  }
}
