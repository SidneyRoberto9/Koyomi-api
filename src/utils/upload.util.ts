import fs from 'fs';
import { google } from 'googleapis';

import config from '../config';
import { __baseDir } from './../server';

export const uploadFile = async (file: any) => {
  const GOOGLE_FOLDER_ID = config.GOOGLE_FOLDER_ID;
  const KEYFILE = __baseDir + '/utils/GoogleDrive.json';

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILE,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const driveService = google.drive({
    version: 'v3',
    auth,
  });

  const fileMetadata = {
    name: file.filename,
    parents: [GOOGLE_FOLDER_ID],
  };
  console.log(file.path);

  const media = {
    mimeType: file.mimeType,
    body: fs.createReadStream(file.path),
  };

  try {
    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log(6);
    fs.unlinkSync(file.path);

    return `https://drive.google.com/uc?export=view&id=${response.data.id}`;
  } catch (error) {
    throw error.message;
  }
};
