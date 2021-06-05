import * as fs from 'fs';
const PUBLIC_FOLDER = 'uploads/';

interface IUploadResponse {
  success: boolean;
  errors?: any;
}

export async function uploadSinglePhoto(file: Express.Multer.File): Promise<IUploadResponse> {
  return new Promise((resolve, reject) => {
    fs.writeFile(PUBLIC_FOLDER + file.originalname, file.buffer, (err) => {
      if (err) return resolve({ success: false, errors: err });
      console.log('file saved to ', file.originalname);
      resolve({ success: true });
    });
  });
}

export function uploadMultiplePhoto(files: Array<Express.Multer.File>): IUploadResponse {
  files.forEach((file) => {
    fs.writeFileSync(PUBLIC_FOLDER + file.originalname, file.buffer);
  });
  console.log(`total ${files.length} files were uploaded`);
  return { success: true };
}