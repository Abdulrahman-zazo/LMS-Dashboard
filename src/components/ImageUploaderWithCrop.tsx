import { useState, useCallback, type FC } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedFile } from "../lib/cropImage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

interface ImageCropperProps {
  imageSrc: string;
  aspect: number;
  width?: number;
  onClose: () => void;
  onCropComplete: (file: File) => void;
}

const ImageCropper: FC<ImageCropperProps> = ({
  imageSrc,
  width,
  aspect,
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
  const { t } = useTranslation("translation");
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[450px] py-8" title="Crop image">
        <div
          className={`relative ${
            width ? `w-${width}` : "w-full"
          } h-[250px] bg-neutral-800 mt-4`}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="mt-0">
          <label>Zoom:</label>
          <Input
            className="text-xs sm:text-sm"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-end gap-2 ">
          <Button
            variant="outline"
            className="text-xs sm:text-sm"
            onClick={onClose}
          >
            {t("pages.courses.dialogs.cancel")}
          </Button>
          <Button className="text-xs sm:text-sm" onClick={onDone}>
            {t("pages.courses.dialogs.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
