import IBook from '../IBook';
export interface IBookListProps {
  books: IBook[];
  deleteBook: Function;
  onPressBook: Function;
}
