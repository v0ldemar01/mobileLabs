import {IPicture} from '../../models/IPicture';
export default class Picture implements IPicture {
  constructor(
    public id: string,
    public largeImageURL: string,
    public imageWidth: number,
    public imageHeight: number,
    public imageSize: number,
  ) {}
}
