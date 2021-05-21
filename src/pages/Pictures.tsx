import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Platform,
  Alert,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Header} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
// import {ImageInfo} from 'expo-image-picker/build/ImagePicker.types';
import {PictureComposition} from '../components/Picture/PictureComposition';
import uuid from 'react-native-uuid';
import {getPictures} from '../api/pictures';
import pictureRepository from '../data/repositories/PictureRepository';
import {IPicture} from '../models/IPicture';

export const Pictures: FunctionComponent = () => {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getPictures()
      .then((images) => {
        setLoading(false);
        setPictures(images);
      })
      .catch(() => {
        setError('Can`t get data from network(');
        pictureRepository
          .getAllPictures()
          .then((images) => {
            setLoading(false);
            setPictures(images);
          })
          .catch(() => {
            setPictures([]);
            setError('Can`t get data from database(');
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!',
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
    //   {
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   },
    // );
    // if (!result.cancelled) {
    //   setPictures((prev) => [...prev, (result as ImageInfo).uri]);
    // }
  };

  const splitPictures = (chunkSize: number, currentPictures: IPicture[]) =>
    [...Array(Math.ceil(pictures.length / chunkSize))].map((_) =>
      currentPictures.splice(0, chunkSize),
    );

  const renderItem = ({item}: {item: IPicture[]}) => (
    <PictureComposition key={uuid.v4() as string} pictures={item} />
  );

  return (
    <>
      <Header
        rightComponent={{icon: 'add', color: 'red', onPress: pickImage}}
      />
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : pictures.length ? (
          <FlatList
            data={splitPictures(7, [...pictures])}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : error ? (
          <Text style={styles.noText}>{error}</Text>
        ) : (
          <Text style={styles.noText}>Pictures not found...</Text>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noText: {
    fontSize: 20,
    color: 'red',
  },
});
