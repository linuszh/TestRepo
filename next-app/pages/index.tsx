import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs';
import ImageUpload from '../components/ImageUpload';
import ImageGallery from '../components/ImageGallery';

type Image = {
  id: string;
  url: string;
  timestamp: number;
};

type HomeProps = {
  images: Image[];
};

export default function Home({ images }: HomeProps) {
  return (
    <div>
      <ImageUpload />
      <ImageGallery images={images} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const filenames = fs.readdirSync(imagesDirectory);
  const images = filenames.map((filename) => ({
    id: filename.replace('.jpg', ''),
    url: `/images/${filename}`,
    timestamp: fs.statSync(path.join(imagesDirectory, filename)).mtime.getTime(),
  }));

  return {
    props: {
      images: images.sort((a, b) => b.timestamp - a.timestamp),
    },
  };
};