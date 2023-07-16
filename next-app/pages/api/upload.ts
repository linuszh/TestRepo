import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve, reject) =>
    upload.single('image')(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    })
  );

  const { file } = req;
  const newLocation = path.join(process.cwd(), 'public/images', file.filename);

  await fs.rename(file.path, newLocation);

  res.status(200).json({ message: 'Image uploaded successfully.' });
};

export default uploadImage;