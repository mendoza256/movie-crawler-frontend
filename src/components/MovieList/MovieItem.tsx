import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MovieType } from "@/lib/baseTypes";

interface MovieItemProps {
  movie: MovieType;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <div className="mb-4 flex items-center">
      <Avatar className="">
        <AvatarFallback>{movie.cinemaName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <Link href={movie.movieUrl} target="_blank">
          <h2 className="text-xl font-semibold">{movie.title}</h2>
        </Link>
        <Link href={movie.cinemaUrl} target="_blank">
          <span className="font-light">Showing at {movie.cinemaName}</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
