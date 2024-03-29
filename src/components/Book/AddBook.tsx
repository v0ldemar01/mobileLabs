import React, {useState, FunctionComponent} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Input} from 'react-native-elements';
import {INavigationProps} from '../../models/props/INavigationProps';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  header: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputContainer: {marginVertical: 8, paddingHorizontal: 16},
  input: {
    borderColor: '#999',
    borderWidth: 1,
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  text: {
    color: 'black',
    marginBottom: 8,
    fontSize: 16,
  },
});

export const AddBook: FunctionComponent<INavigationProps> = ({
  navigation,
}: INavigationProps) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const addBook = () => console.log('new book');
  return (
    <View style={styles.container}>
      <Input label="Title" onChangeText={setTitle} />
      <Input label="Subtitle" onChangeText={setSubtitle} />
      <Input
        leftIcon={{type: 'font-awesome', name: 'money'}}
        keyboardType="numeric"
        label="Price"
        onChangeText={setPrice}
        errorStyle={{color: 'red'}}
        errorMessage={error}
      />
      <Button
        title="Add"
        onPress={() => {
          if (isNaN(Number(price))) {
            return setError('Please enter a number');
          }
          addBook();
          navigation.goBack();
        }}
        disabled={!(title && subtitle && price)}
      />
    </View>
  );
};
