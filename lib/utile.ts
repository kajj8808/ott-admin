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

/** 압축된/축소된 TMDB Image url을 original url으로 변경시키는 함수. */
export function convertOriginalTMDBImage() {}
export function formatToTimeAgo(date: string) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const time = new Date(date).getTime();
  const now = new Date().getTime();

  let formatType: Intl.RelativeTimeFormatUnit;
  let diff = time - now;

  if (Math.abs(diff) < minute) {
    formatType = "seconds";
    diff = Math.round(diff / second);
  } else if (Math.abs(diff) < hour) {
    formatType = "minutes";
    diff = Math.round(diff / minute);
  } else if (Math.abs(diff) < day) {
    formatType = "hours";
    diff = Math.round(diff / hour);
  } else {
    formatType = "days";
    diff = Math.round(diff / day);
  }

  // Intl( 다국어 지원 ) 국제화 관련된 api -3 -> 3일전
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, formatType);
}
