const baseURL = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = String(process.env.LASTFM_API_KEY);

if (!API_KEY) {
  console.warn("LastFM Api Key is not set");
}

export const PageList = ["artists", "albums"] as const;

export type PageType = (typeof PageList)[number];

export const PeriodList = [
  "overall",
  "7day",
  "1month",
  "3month",
  "6month",
  "12month",
];

export const LimitList = ["9", "16", "25", "100"];

export type StatsParams = {
  user: string;
  period: (typeof PeriodList)[number];
  limit: (typeof LimitList)[number];
};

const STATS_PAGE: Record<PageType, string> = {
  artists: "user.getTopArtists",
  albums: "user.getTopAlbums",
};

export const url = (page: PageType, params: StatsParams) =>
  `${baseURL}?` +
  new URLSearchParams({
    method: STATS_PAGE[page],
    api_key: API_KEY,
    format: "json",
    ...params,
  });

export type RequestParams = {
  page: string;
  perPage: string;
  total: string;
  totalPages: string;
  user: string;
};

type Artist = {
  mbid: string;
  name: string;
  url: string;
};

export type Image = {
  size: string;
  "#text": string;
};

export type Stats = {
  "@attr": {
    rank: string;
  };
  name: string;
  playcount: string;
  image: Image[];
};

export type ArtistStats = Artist &
  Stats & {
    playcount: string;
    streamable: string;
  };

export type AlbumStats = Stats & {
  artist: Artist;
  mbid: string;
  url: string;
  name: string;
};

export type TopArtists = {
  "@attr": RequestParams;
  artist: ArtistStats[];
};

export type TopAlbums = {
  "@attr": RequestParams;
  album: AlbumStats[];
};

export type StatsType = {
  topartists?: TopArtists;
  topalbums?: TopAlbums;
};
