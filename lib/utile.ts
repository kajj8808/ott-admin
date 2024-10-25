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
