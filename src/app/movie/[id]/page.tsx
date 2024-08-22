"use client"
import Error from "@/components/Error";
import MovieForm from "@/components/forms/MovieForm";
import { hocAuth } from "@/components/hoc/HOCAuth";
import Spinner from "@/components/spinner";
import { IMovieForm } from "@/interfaces/MovieFormInterface";
import { IMovie } from "@/interfaces/movie";
import { getMovie } from "@/services/movieService";
import React, { useEffect, useState } from "react";

const UpdateMovie = ({ params }: any) => {
  const { id } = params;

  if(isNaN(+id)) {
    return <Error message="Invalid id is passed!" />
  }
  const [movieDetails, setMovieDetails] = useState<{data: IMovie | null, status: number, error: string}>({data: {
    id: 0,
    image_url: "",
    title: "",
    year: "0"
  }, status: 0, error: ""});
  useEffect(() => {
    (async () => {
      try {
        // api call to get the movie details
        const movie = await getMovie(+id);
        if(movie.status === 200) {
          setMovieDetails(movie)
        }
      } catch (error: any) {
        const { data } = error;
        setMovieDetails({...movieDetails, status: data.status, error: data.error})
      }
    })();
  }, []);
  return movieDetails.status === 0 ? <Spinner /> : (movieDetails.status !== 200 ? <Error message={movieDetails.error} /> : <MovieForm movieDetails={movieDetails.data} />)
};
export default hocAuth(UpdateMovie);
