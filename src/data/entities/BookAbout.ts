import {Column, Entity, JoinColumn, OneToOne, RelationId} from 'typeorm';
import {AbstractEntity} from '../abstract/AbstractEntity';
import {Book} from './Book';

@Entity()
export class BookAbout extends AbstractEntity {
  @Column()
  authors: string;

  @Column()
  desc: string;

  @Column()
  image: string;

  @Column()
  isbn13: string;

  @Column()
  language: string;

  @Column()
  pages: string;

  @Column()
  price: string;

  @Column()
  publisher: string;

  @Column()
  rating: string;

  @Column()
  subtitle: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @RelationId((about: BookAbout) => about.book)
  @Column()
  readonly bookId: string;

  @OneToOne(() => Book, {onDelete: 'CASCADE'})
  @JoinColumn()
  public book: Book;
}
