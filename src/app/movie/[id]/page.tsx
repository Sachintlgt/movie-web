"use client"
import MovieForm from "@/components/forms/MovieForm";
import { hocAuth } from "@/components/hoc/HOCAuth";
import { IMovieForm } from "@/interfaces/MovieFormInterface";
import { IMovie } from "@/interfaces/movie";
import { getMovie } from "@/services/movieService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateMovie = ({ params }: any) => {
  const { id } = params;

  if(isNaN(+id)) {
    return <div>Error</div>
  }

  
  const [movieDetails, setMovieDetails] = useState<IMovie | null>({
    id: 0,
    image_url: "",
    title: "",
    year: "0"
  });
  useEffect(() => {
    (async () => {
      try {
        // api call to get the movie details
        const movie = await getMovie(+id);
        if(movie.status === 200) {
          setMovieDetails(movie.data)
          debugger
        }
      } catch (error: any) {
        console.log(error)
      }
    })();
  }, []);
  return <MovieForm movieDetails={movieDetails} />;
};
export default hocAuth(UpdateMovie);
