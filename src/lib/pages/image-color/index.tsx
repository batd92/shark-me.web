import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/lib/components/ui/input";

const DetailedColorPicker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const zoomCanvas = zoomCanvasRef.current;

    if (canvas && zoomCanvas && imageSrc) {
      const ctx = canvas.getContext("2d");
      const zoomCtx = zoomCanvas.getContext("2d");
      if (!ctx || !zoomCtx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);

      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      setColor(`rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`);

      updateZoomCanvas(x, y, ctx, zoomCanvas, zoomCtx, scaleX, scaleY);
    }
  };

  const updateZoomCanvas = (
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    zoomCanvas: HTMLCanvasElement,
    zoomCtx: CanvasRenderingContext2D,
    scaleX: number,
    scaleY: number
  ) => {
    const zoomSize = 50; 
    
    const offsetX = x - zoomSize / 2;
    const offsetY = y - zoomSize / 2;

    const maxX = Math.min(offsetX, canvasRef.current!.width - zoomSize);
    const maxY = Math.min(offsetY, canvasRef.current!.height - zoomSize);
    
    const zoomData = ctx.getImageData(maxX, maxY, zoomSize, zoomSize);

    zoomCanvas.width = zoomSize;
    zoomCanvas.height = zoomSize;

    zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
    zoomCtx.putImageData(zoomData, 0, 0);
  };

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && imageSrc) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  };

  useEffect(() => {
    if (imageSrc) {
      drawImageOnCanvas();
    }
  }, [imageSrc]);

  return (
    <div className="flex flex-col lg:flex-row justify-start items-center gap-6 p-6">
      <div className="flex flex-col items-start gap-4 p-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseMove={handleMouseMove}
          className="border border-black cursor-crosshair"
        />
      </div>

      <div className="flex flex-col items-center gap-4 p-4">
        <canvas
          ref={zoomCanvasRef}
          className="border border-gray-400 w-24 h-24 mb-4"
        />
        <div
          className="w-10 h-10 border border-black mb-2"
          style={{ backgroundColor: color }}
        />
        <p className="text-lg">
  <span
    style={{
      color,
      display: "inline-block",
      minWidth: "100px", // Đảm bảo có chiều rộng tối thiểu cố định
      textAlign: "center", // Căn giữa nội dung
    }}
  >
    {color}
  </span>
</p>

      </div>
    </div>
  );
};

export default DetailedColorPicker;
