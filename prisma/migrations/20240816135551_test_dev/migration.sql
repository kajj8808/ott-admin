-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "poster" TEXT,
    "logo" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tmdbId" INTEGER NOT NULL,
    "isOldOriginal" BOOLEAN,
    "isMangaOriginal" BOOLEAN,
    "isGameOriginal" BOOLEAN,
    "isLightNovelOriginal" BOOLEAN,
    "first_air_date" TEXT,
    "homepage" TEXT,
    "next_episode_to_air" DATETIME,
    "original_name" TEXT
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductionCompanies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logo_path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "autoUpload" BOOLEAN NOT NULL DEFAULT false,
    "nyaaQuery" TEXT,
    "skippedSeasonCount" INTEGER,
    "excludedEpisodeCount" INTEGER,
    "isAss" BOOLEAN,
    "isDB" BOOLEAN,
    "encoder" TEXT,
    "seriesId" INTEGER,
    CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumnail" TEXT NOT NULL,
    "runningTime" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,
    "smiId" TEXT,
    "isSmi" BOOLEAN,
    "isAss" BOOLEAN,
    "seasonId" INTEGER,
    "kr_overview" BOOLEAN,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EpisodeWatchRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "watchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" REAL NOT NULL DEFAULT 0.0,
    "episodeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EpisodeWatchRecord_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EpisodeWatchRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AutoSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tmdbId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DownloadedMagnet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cipherMagnet" TEXT NOT NULL,
    "episodeId" INTEGER,
    CONSTRAINT "DownloadedMagnet_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SeriesGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SeriesGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Genres" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SeriesGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SeriesProductionCompanies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SeriesProductionCompanies_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductionCompanies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SeriesProductionCompanies_B_fkey" FOREIGN KEY ("B") REFERENCES "Series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_title_key" ON "Series"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Series_tmdbId_key" ON "Series"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "AutoSeries_tmdbId_key" ON "AutoSeries"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadedMagnet_cipherMagnet_key" ON "DownloadedMagnet"("cipherMagnet");

-- CreateIndex
CREATE UNIQUE INDEX "_SeriesGenres_AB_unique" ON "_SeriesGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_SeriesGenres_B_index" ON "_SeriesGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SeriesProductionCompanies_AB_unique" ON "_SeriesProductionCompanies"("A", "B");

-- CreateIndex
CREATE INDEX "_SeriesProductionCompanies_B_index" ON "_SeriesProductionCompanies"("B");
