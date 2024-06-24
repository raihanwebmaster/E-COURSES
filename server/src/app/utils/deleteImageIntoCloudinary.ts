/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from 'cloudinary';

export function destroyImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
