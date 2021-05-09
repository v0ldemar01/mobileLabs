import axios from 'axios';

const API_KEY = '19193969-87191e5db266905fe8936d565';
const SERVICE_PICTURE_URL = 'https://pixabay.com/api/';

export const getPictures = async (
  request: string = 'red+cars',
  page: number = 21,
): Promise<string[]> => {
  try {
    const url = `${SERVICE_PICTURE_URL}?key=${API_KEY}&q=${request}&image_type=photo&per_page=${page}`;
    const res = await axios(url);
    if (!res) throw new Error(res);
    const images = (res as any).data.hits?.map((img: any) => img.largeImageURL);
    return images ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
