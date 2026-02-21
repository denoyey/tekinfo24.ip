import { galleryData } from './gallery';

export { galleryData };

export const getAllGalleryImages = () => {
    return galleryData.flatMap(semester => semester.images);
};

export const getRandomImages = (count = 5) => {
    const all = getAllGalleryImages();
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
