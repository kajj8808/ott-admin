"use server";
import { TMDB_API_KEY, TMDB_API_URL } from "@/lib/constants";
import db from "@/lib/db";
import { makeTMDBImageURL } from "@/lib/tmdb";
import { TMDBSeason, TMDBSeries } from "@/types/interfaces";
import { Genres } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const formScheme = z.object({
  tmdbId: z.coerce.number().min(1),
});
/**  db에 genres를 연결하기 위해 사용 */
async function getGenres({ id, name }: Genres) {
  const genresId = await db.genres.findUnique({
    where: {
      id,
    },
    select: { id: true },
  });
  if (genresId) {
    return genresId;
  } else {
    const newGenres = await db.genres.create({
      data: {
        id,
        name,
      },
      select: {
        id: true,
      },
    });

    return newGenres;
  }
}

async function getSeason(season: TMDBSeason, seriesId: number) {
  const seasonId = await db.season.findUnique({
    where: { id: season.id },
    select: {
      id: true,
    },
  });
  if (seasonId) {
    return seasonId;
  } else {
    const newSeason = await db.season.create({
      data: {
        id: season.id,
        name: season.name,
        number: season.season_number,
        autoUpload: true,
        seriesId: seriesId,
        air_date: new Date(season.air_date),
        poster: makeTMDBImageURL(season.poster_path!),
      },
      select: {
        id: true,
      },
    });
    return newSeason;
  }
}

export async function registerSeries(_: any, formData: FormData) {
  const data = {
    tmdbId: formData.get("tmdb_id"),
  };

  const result = formScheme.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const tmdbFetchOption: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };
    const tmdbSeries = (await (
      await fetch(
        `${TMDB_API_URL}/tv/${result.data.tmdbId}?language=ko-KR`,
        tmdbFetchOption
      )
    ).json()) as TMDBSeries;

    const series = await db.series.upsert({
      where: {
        tmdbId: tmdbSeries.id,
      },
      create: {
        title: tmdbSeries.name,
        overview: tmdbSeries.overview,
        coverImage: makeTMDBImageURL(tmdbSeries.backdrop_path),
        tmdbId: tmdbSeries.id,
        homepage: tmdbSeries.homepage,
        poster: makeTMDBImageURL(tmdbSeries.poster_path),
        original_name: tmdbSeries.original_name,
        first_air_date: tmdbSeries.first_air_date,
        next_episode_to_air: tmdbSeries.next_episode_to_air
          ? new Date(tmdbSeries.next_episode_to_air.air_date)
          : null,
      },
      update: {
        homepage: tmdbSeries.homepage,
        next_episode_to_air: tmdbSeries.next_episode_to_air
          ? new Date(tmdbSeries.next_episode_to_air.air_date)
          : null,
      },
    });

    const genresList = await Promise.all(
      tmdbSeries.genres.map((genre) => getGenres(genre))
    );
    const seasonList = await Promise.all(
      tmdbSeries.seasons.map((season) => getSeason(season, series.id))
    );
    const updatedSeries = await db.series.update({
      where: {
        id: series.id,
      },
      data: {
        seasons: {
          connect: seasonList,
        },
        genres: {
          connect: genresList,
        },
      },
      select: {
        id: true,
      },
    });
    if (updatedSeries) {
      redirect("/admin");
    }
  }
}
