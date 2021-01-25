export default function trimImage(image: HTMLImageElement): string {
  const canvas = convertImageToCanvas(image);
  const trimmedCanvas = trimCanvas(canvas);
  const trimmedCanvasDataURL = trimmedCanvas.toDataURL('image/png');
  return trimmedCanvasDataURL;
}

function convertImageToCanvas(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const canvasContext = canvas.getContext('2d');
  canvasContext!.drawImage(image, 0, 0);
  return canvas;
}

function trimCanvas(canvas: HTMLCanvasElement) {
  const canvasContext = canvas.getContext('2d')!;
  const canvasContextImageData = canvasContext.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const bounds: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  } = {
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  };

  let i;
  for (i = 0; i < canvasContextImageData.data.length; i += 4) {
    if (canvasContextImageData.data[i + 3] !== 0) {
      const x = (i / 4) % canvas.width;
      const y = ~~(i / 4 / canvas.width);

      if (bounds.top === undefined) {
        bounds.top = y;
      }

      if (bounds.left === undefined) {
        bounds.left = x;
      } else if (bounds.left && x < bounds.left) {
        bounds.left = x;
      }

      if (bounds.right === undefined) {
        bounds.right = x;
      } else if (bounds.right && bounds.right < x) {
        bounds.right = x;
      }

      if (bounds.bottom === undefined) {
        bounds.bottom = y;
      } else if (bounds.bottom && bounds.bottom < y) {
        bounds.bottom = y;
      }
    }
  }

  const trimHeight = bounds.bottom! - bounds.top!;
  const trimWidth = bounds.right! - bounds.left!;
  const trimmed = canvasContext.getImageData(
    bounds.left!,
    bounds.top!,
    trimWidth,
    trimHeight
  );

  const canvasCopy = document.createElement('canvas').getContext('2d')!;
  canvasCopy.canvas.width = trimWidth;
  canvasCopy.canvas.height = trimHeight;
  canvasCopy.putImageData(trimmed, 0, 0);

  return canvasCopy.canvas;
}
