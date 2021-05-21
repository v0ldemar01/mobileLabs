import {IPicture} from '../../models/IPicture';
import uuid from 'react-native-uuid';
import AbstactRepository from './AbstractRepository';
import Picture from '../entities/Picture';

interface WebSQLRows {
  _array: Picture[];
  length: number;
}
class PictureRepository extends AbstactRepository {
  addPicture = async (picture: IPicture): Promise<void> => {
    try {
      const {largeImageURL, imageWidth, imageHeight, imageSize} = picture;
      const {length} = await this.getPictureByUrl(largeImageURL);
      if (!length) {
        await this.execute(
          `INSERT OR REPLACE INTO pictures (
          id,
          largeImageURL, 
          imageWidth,
          imageHeight,
          imageSize
        ) VALUES (?, ?, ?, ?, ?)`,
          [
            uuid.v4() as string,
            largeImageURL,
            imageWidth,
            imageHeight,
            imageSize,
          ],
        );
      }
    } catch (error) {
      console.log('addPictureError', error);
    }
  };

  getPictureByUrl = async (largeImageURL: string): Promise<WebSQLRows> => {
    try {
      const result = await this.execute(
        'SELECT * FROM pictures WHERE largeImageURL = ?',
        [largeImageURL],
      );
      return result[1].rows;
    } catch (error) {
      console.log('getPictureByUrlError', error);
    }
  };

  getAllPictures = async (): Promise<Picture[]> => {
    try {
      const result = await this.execute('SELECT * FROM pictures', []);
      return result[1].rows._array;
    } catch (error) {
      console.log('getAllPicturesError', error);
    }
  };

  deletePictureById = async (id: string): Promise<void> => {
    try {
      await this.execute('DELETE FROM pictures WHERE id = ?', [id]);
    } catch (error) {
      console.log('deletePictureByIdError', error);
    }
  };
}

export default new PictureRepository();
