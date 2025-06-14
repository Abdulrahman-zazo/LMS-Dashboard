import type { Area } from "react-easy-crop";

export async function getCroppedFile(
  imageSrc: string,
  cropArea: Area,
  fileName = "cropped.jpg" // ← اسم افتراضي إن ما تم تمريره
): Promise<File> {
  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // مهم إذا كانت الصورة من دومين خارجي
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
    });
  };

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cropArea.width;
  canvas.height = cropArea.height;

  ctx?.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], fileName, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
}
