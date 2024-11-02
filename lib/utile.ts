"use client";
export function getAverageColor(frameData: Uint8ClampedArray) {
  const frameDataLength = frameData?.length;
  const totalPixels = frameDataLength / 4;
  const rgbData = { r: 0, g: 0, b: 0 };
  // r,g,b 각각 을 평균 내기 위해서 rgba로 구성된 생상 채널에서 픽셀 수를 구함.
  for (let i = 0; i < frameDataLength; i += 4) {
    rgbData.r += frameData[i];
    rgbData.g += frameData[i + 1];
    rgbData.b += frameData[i + 2];
  }
  return {
    r: rgbData.r / totalPixels,
    g: rgbData.g / totalPixels,
    b: rgbData.b / totalPixels,
  };
}

interface RGBColorProps {
  r: number;
  g: number;
  b: number;
}
/** rgb의 총합을 계산하기 위한 함수 */
export function calAddRGBColor({ r, g, b }: RGBColorProps) {
  return r + g + b;
}

function componentToHex(c: number) {
  const hex = Math.abs(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex({ r, g, b }: RGBColorProps) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
