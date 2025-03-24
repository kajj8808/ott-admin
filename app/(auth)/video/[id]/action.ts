export const getSubtitleId = async (videoId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subtitle/get_subtitles/${videoId}`,
  );
  const json = await res.json();
  if (json.ok) {
    return json.result;
  } else {
    return null;
  }
};
