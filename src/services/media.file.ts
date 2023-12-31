/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';
import { ImageData } from '../types/img.data.js';

const debug = createDebug('EPV:mediaFiles');

export class MediaFiles {
  constructor() {
    cloudinary.config({
      secure: true,
    });
    debug('Instantiated');
    debug('key', cloudinary.config());
  }

  async uploadImage(imagePath: string) {
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const imageData: ImageData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format,
      };

      return imageData;
    } catch (err) {
      const error = err as Error;
      throw new HttpError(406, 'Not Acceptable', error.message);
    }
  }
}
