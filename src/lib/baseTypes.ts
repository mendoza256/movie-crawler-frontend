export type MovieType = {
  title: string;
  cinemaName: string;
  cinemaUrl: string;
  movieUrl: string;
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

// export type UserType = {
//   id: string;
//   username: string;
//   email: string;
//   token: string;
//   role: "user" | "superadmin";
// };
