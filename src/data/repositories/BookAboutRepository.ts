import {EntityRepository, Repository} from 'typeorm';
import {BookAbout} from '../entities/BookAbout';
import {IAboutBook} from '../../models/IBook';

@EntityRepository(BookAbout)
export class BookAboutRepository extends Repository<BookAbout> {
  addBookAbout(bookAbout: IAboutBook): Promise<BookAbout> {
    return this.create(bookAbout).save();
  }

  getBookByIsbn13(isbn13: string): Promise<BookAbout> {
    return this.findOne({where: {isbn13}}) as Promise<BookAbout>;
  }

  async deleteBookAbout(isbn13: string): Promise<BookAbout> {
    const component = await this.getBookByIsbn13(isbn13);
    return this.remove(component);
  }
}
