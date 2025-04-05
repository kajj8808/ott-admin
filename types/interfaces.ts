export interface Season {
  id: number;
  series_id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string;
  air_date: string;
  nyaa_query: string | null;
  should_download: boolean;
  tmdb_season_number: number;
  episode_offset: number | null;
  created_at: string;
  updated_at: string;
}

export interface Series {
  id: number;
  title: string;
  overview: string;
  logo: string | null;
  backdrop_path: string;
  poster_path: string;
  original: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: number;
  season_id: number;
  series_id: number;
  video_content_id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  runtime: number;
  is_korean_translated: boolean;
  created_at: string;
  updated_at: string;
  season: Season;
  series: Series;
}
