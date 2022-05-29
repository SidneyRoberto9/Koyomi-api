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
  };
};
