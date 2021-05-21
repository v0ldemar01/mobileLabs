import axios from 'axios';
import pictureRepository from '../data/repositories/PictureRepository';
import {IPicture} from '../models/IPicture';

const API_KEY = '19193969-87191e5db266905fe8936d565';
const SERVICE_PICTURE_URL = 'https://pixabay.com/api/';

export const getPictures = async (
  request: string = 'red+cars',
  page: number = 21,
): Promise<IPicture[]> => {
  const url = `${SERVICE_PICTURE_URL}?key=${API_KEY}&q=${request}&image_type=photo&per_page=${page}`;
  const res = await axios(url);
  if (!res) {
    throw new Error(res as any);
  }
  const images = (res as any).data.hits;
  for (const image of images) {
    await pictureRepository.addPicture(image);
  }
  return images ?? [];
};
