export const loadImageHandler = async (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.src = src;
    });
};