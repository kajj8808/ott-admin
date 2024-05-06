/** 구글 공유 url을 host가능한(웹 에서 볼 수 있는)url로 변경해주는 함수 */
export function convertSharedUrlToHostedImageUrl(googleSharedUrl: string) {
  const splittedUrl = googleSharedUrl.split("/");
  const driveId = splittedUrl[splittedUrl.length - 1];
  const sharedUrl = `https://drive.google.com/uc?export=view&id=${driveId}`;
  return sharedUrl;
}
