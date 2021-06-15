import { Application } from 'express';
import glob from 'glob';

import config from './config';

export default async function (app: Application) {
  // If is dev ".ts" or built ".js"
  const currentFileExtension = __filename.split('.')[1];

  await new Promise<void>((resolve, reject) => {
    const searchFolder = `${__dirname}/domains/**/routes.${currentFileExtension}`;

    glob(searchFolder, (error, files) => {
      if (error) {
        reject(error);
      }

      files.forEach((file) => {
        const { router, prefix } = require(file);

        app.use(`${config.api.v1.base_path}/${prefix}`, router);
      });

      resolve();
    });
  });
}
