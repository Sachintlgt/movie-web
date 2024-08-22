"use client";
import MovieForm from "@/app/components/forms/MovieForm";
import { hocAuth } from "@/app/components/hoc/HOCAuth";
import { MovieFormInterface } from "@/app/utility/interface/MovieFormInterface";
import React, { useEffect, useState } from "react";

const UpdateMovie = ({ params }: any) => {
  const { id } = params;
  console.log(id, "id");

  const [movieDetails, setMovieDetails] = useState<MovieFormInterface>({
    title: "",
    publishingYear: null,
    thumbnail: "",
    id: 2,
  });
  useEffect(() => {
    (async () => {
      try {
        // api call to get the movie details
      } catch (error: any) {}
    })();
  }, []);
  return <MovieForm movieDetails={movieDetails} />;
};
export default hocAuth(UpdateMovie);
