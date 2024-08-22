"use client"
import MovieForm from "../../../components/forms/MovieForm";
import { hocAuth } from "@/components/hoc/HOCAuth";

const CreateMovie = () => {

  return <MovieForm movieDetails={{
    title: "",
    publishingYear: null,
    thumbnail: "",
  }} />;
};
export default hocAuth(CreateMovie);
