export async function getCroppedFile(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
): Promise<File> {
  const img = new Image();
  img.src = imageSrc;
  await new Promise((res) => (img.onload = res));

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("ctx failed");

  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((res) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Blob failed");
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      res(file);
    }, "image/jpeg");
  });
}
