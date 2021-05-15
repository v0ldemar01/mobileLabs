import {Column, Entity, OneToOne} from 'typeorm';
import {AbstractEntity} from '../abstract/AbstractEntity';
import {BookAbout} from './BookAbout';

@Entity()
export class Book extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  isbn13: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @OneToOne(() => BookAbout, (about) => about.book)
  about: BookAbout;
}
