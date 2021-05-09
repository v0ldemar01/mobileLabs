import React, {FunctionComponent, useEffect, useState} from 'react';
import {Platform, Alert, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {ImageInfo} from 'expo-image-picker/build/ImagePicker.types';
import {PictureComposition} from '../components/Picture/PictureComposition';
import uuid from 'react-native-uuid';
import {getPictures} from '../api/pictures';

export const Pictures: FunctionComponent = () => {
  const [pictures, setPictures] = useState<string[]>([]);

  useEffect(() => {
    getPictures().then((images) => setPictures(images));
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
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      },
    );

    if (!result.cancelled) {
      setPictures((prev) => [...prev, (result as ImageInfo).uri]);
    }
  };

  const splitPictures = (chunkSize: number, currentPictures: string[]) =>
    [...Array(Math.ceil(pictures.length / chunkSize))].map((_) =>
      currentPictures.splice(0, chunkSize),
    );

  const renderItem = ({item}: {item: string[]}) => (
    <PictureComposition key={uuid.v4() as string} pictures={item} />
  );

  return (
    <>
      <Header
        rightComponent={{icon: 'add', color: 'red', onPress: pickImage}}
      />
      <FlatList
        data={splitPictures(7, [...pictures])}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  );
};
