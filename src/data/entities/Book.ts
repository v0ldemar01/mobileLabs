import {IBook} from '../../models/IBook';
export default class Book implements IBook {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public isbn13: string,
    public price: string,
    public image: string,
    public url: string,
  ) {}
}
