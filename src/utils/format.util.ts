export const formatJk = (data: any) => {
  return {
    title: data.title,
    image: data.images.jpg.image_url,
    date: {
      year: data.year,
      season: data.season,
      weekday: null,
      airing: data.airing,
    },
    episodes: data.episodes,
    externalLinks: [null],
  };
};

export const formatJkArray = (data: any) => {
  return data.map((content: any) => ({
    title: content.title,
    image: content.images.jpg.image_url,
    date: {
      year: content.year,
      season: content.season,
      weekday: null,
      airing: content.airing,
    },
    episodes: content.episodes,
    externalLinks: [null],
  }));
};

export const formatUserToken = (user: any, accessToken: string) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    accessToken: accessToken,
    animeWatched: user.animeWatched,
  };
};

export const formatUser = (user: any) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    animeWatched: user.animeWatched,
  };
};

export const formatAnimeReturn = (anime: any) => {
  return {
    _id: anime._id,
    title: anime.title,
    image: anime.image,
    date: anime.date,
    episodes: anime.episodes,
    externalLinks: anime.externalLinks,
  };
};

export const isEmpty = (obj: any) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  return false;
};

export const formatJkGetAnimeByName = async (anime: any) => {
  return {
    title: anime.title,
    titleJapanese: anime.title_japanese,
    image: anime.images.jpg.image_url,
    episodes: anime.episodes,
    season: anime.season,
    year: anime.year,
    rating: anime.rating,
    genres: [
      ...anime.genres.map((genre: any) => genre.name),
      ...anime.explicit_genres.map((genre: any) => genre.name),
      ...anime.themes.map((genre: any) => genre.name),
      ...anime.demographics.map((genre: any) => genre.name),
    ],
    synopsis: anime.synopsis,
  };
};
