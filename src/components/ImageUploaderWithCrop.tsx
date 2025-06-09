import { useState, useCallback, type FC } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedFile } from "../lib/cropImage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageCropperProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (file: File) => void;
}

const ImageCropper: FC<ImageCropperProps> = ({
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [area, setArea] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setArea(croppedAreaPixels);
  }, []);

  const onDone = async () => {
    if (!area) return;
    const file = await getCroppedFile(imageSrc, area);
    onCropComplete(file);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg h-[450px]">
        <div className="relative w-full h-[300px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="mt-4">
          <label>Zoom:</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={onDone}>تم</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
