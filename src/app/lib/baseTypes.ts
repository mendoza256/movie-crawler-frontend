export type DbMovieType = {
  _id: string;
  title: string;
  cinemaName: string;
  cinemaUrl: string;
  movieUrl: string;
  tmdbData: TMDBMovieType;
};

export type TMDBMovieType = {
  id: number;
  original_title: string;
  popularity: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
};

export type WatchlistMovieType = {
  title: string;
  date_added: string;
  id: number;
  tmdbData: TMDBMovieType;
  sent_email: boolean;
};

export type MovieNotificationType = {
  title: string;
  message: string;
  movieLink: string;
  cinemaLink: string;
};

// export type UserType = {
//   id: string;
//   username: string;
//   email: string;
//   token: string;
//   role: "user" | "superadmin";
// };
