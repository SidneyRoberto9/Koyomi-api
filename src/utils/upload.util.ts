import fs from 'fs';
import { google } from 'googleapis';
import path from 'path';

import config from '../config';
import { __baseDir } from '../server';

export const uploadFile = async (file: any) => {
  const GOOGLE_FOLDER_ID = config.GOOGLE_FOLDER_ID;
  const FILE_PATH = __baseDir + '/tmp/' + file.filename;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: config.GOOGLE_PRIVATE_KEY,
        client_email: config.GOOGLE_EMAIL,
        client_id: config.GOOGLE_CLIENT_ID,
      },
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

    const media = {
      mimeType: file.mimeType,
      body: fs.createReadStream(FILE_PATH),
    };

    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    fs.unlinkSync(path.join(FILE_PATH));

    return `https://drive.google.com/uc?export=view&id=${response.data.id}`;
  } catch (error) {
    console.log('Erro in create file');
  }
};
