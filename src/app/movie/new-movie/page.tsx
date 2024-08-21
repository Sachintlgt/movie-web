"use client";
import { useState } from "react";
import MovieForm from "../../components/forms/MovieForm";
import { MovieFormInterface } from "../../utility/interface/MovieFormInterface";
import { hocAuth } from "@/app/components/hoc/HOCAuth";

const CreateMovie = () => {
  const [movieDetails, setMovieDetails] = useState<MovieFormInterface>({
    title: "",
    publishingYear: null,
    thumbnail: "",
  });
  return <MovieForm movieDetails={movieDetails} />;
};
export default hocAuth(CreateMovie);
