import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from '../../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'daumdhnzd',
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const cloudinaryUpload = cloudinary;

export const sendImageTocloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        fs.unlink(path, function (err) {
          if (err) return err;
        });
      },
    );
  });
};

const removeExtension = (filename: string) => {
  return filename.split('.').slice(0, -1).join('.');
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (_req, file) => ({
    folder: 'uploads', // Optional: Store in a specific folder
    public_id:
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      file.fieldname +
      '-' +
      removeExtension(file.originalname),
  }),
});

export const upload = multer({ storage: storage });
