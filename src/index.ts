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
  const canvasCopy = document.createElement('canvas').getContext('2d')!;
  const canvasContextPixels = canvasContext.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const canvasContextPixelsLength = canvasContextPixels.data.length;
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
  for (i = 0; i < canvasContextPixelsLength; i += 4) {
    if (canvasContextPixels.data[i + 3] !== 0) {
      const x = (i / 4) % canvas.width;
      const y = ~~(i / 4 / canvas.width);

      if (bounds.top === null) {
        bounds.top = y;
      }

      if (bounds.left === null) {
        bounds.left = x;
      } else if (bounds.left && x < bounds.left) {
        bounds.left = x;
      }

      if (bounds.right === null) {
        bounds.right = x;
      } else if (bounds.right && bounds.right < x) {
        bounds.right = x;
      }

      if (bounds.bottom === null) {
        bounds.bottom = y;
      } else if (bounds.bottom && bounds.bottom < y) {
        bounds.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content
  const trimHeight = bounds.bottom! - bounds.top!;
  const trimWidth = bounds.right! - bounds.left!;
  const trimmed = canvasContext.getImageData(
    bounds.left!,
    bounds.top!,
    trimWidth,
    trimHeight
  );

  canvasCopy.canvas.width = trimWidth;
  canvasCopy.canvas.height = trimHeight;
  canvasCopy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return canvasCopy.canvas;
}
