import {GestureResponderEvent} from 'react-native';
import {IBook} from '../IBook';

export interface IBookProps {
  item: IBook;
  onPress: (event: GestureResponderEvent) => void;
  onDelete: Function;
}
