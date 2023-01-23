import fetch from 'node-fetch';
import httpStatus from 'http-status';

import { S3Service } from '../../services';

export async function uploadPicture(documentKey, path) {
  try {
    const response = await fetch(path);
    if (response) {
      const buffer = await response.buffer();

      if (response.status === httpStatus.OK) {
        await S3Service.upload(
          {
            buffer,
          },
          documentKey,
        );

        return S3Service.getPath(documentKey);
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log('google-auth-sign-in -> Error while sending picture to the bucket');
    return null;
  }
}
