import fs from 'fs';
import { google } from 'googleapis';

import config from '../config';

export const uploadFile = async (file: any) => {
  const GOOGLE_FOLDER_ID = config.GOOGLE_FOLDER_ID;

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
    console.log('Erro in create file');
  }
};
