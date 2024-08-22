"use client";
import { FILE_TYPES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import close from "@/../public/images/cross.svg";
import download from "@/../public/images/download_black.svg";
import Link from "next/link";
import { createMovie, updateMovie } from "@/services/movieService";
import { useDispatch } from "react-redux";
import { setLoader } from "@/redux/loaderSlice";
import { sweetAlertToast } from "@/services/toastServices";
import { useTranslation } from 'react-i18next';
import Button from "../Button";
import vecter from '@/../public/images/bottom-vector.svg'
import mobilevecter from '@/../public/images/mobile-vector.svg'
import Image from "next/image";
import { useRouter } from "next/navigation";

// Common Form for create and update the movie
const MovieForm = (props: any) => {
  const { t } = useTranslation();
  const { movieDetails } = props;
  const [fileError, setFileError] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<any>(null);
  const dispatch = useDispatch();
  const router = useRouter()
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: movieDetails.title,
      publishingYear: movieDetails.publishingYear,
      thumbnail: movieDetails.image_url,
    },
  });

  useEffect(() => {
    // Reset the form inputs
    reset({
      title: movieDetails.title,
      publishingYear: movieDetails.year,
      thumbnail: movieDetails.thumbnail,
    });
    setThumbnailUrl(movieDetails.image_url);
  }, [movieDetails]);

  //   validate the file formats
  const validateFile = (error: string) => {
    if (error) {
      setFileError("Unsupported format. Use PNG, JPG .");
      setThumbnailUrl("");
      setThumbnailUrl(null);
      return;
    } else {
      setFileError("");
    }
  };

  // handle thumbnail file change 
  const handleFile = (file: any) => {
    if (file) {
      setFileError("");
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      setThumbnailFile(file);
    }
  };
  // remove thumbnail  file
  const removeImg = () => {
    setFileError(t("create.form.validation.imageRequired"));
    movieDetails.image_url = "";
    setThumbnailUrl("");
    setThumbnailFile(null);
  };

  // function to create and update the movies data 
  const createOrUpdateMovie = async (data: any) => {
    try {
      if (!movieDetails.id) {
        if((!thumbnailFile || movieDetails.thumbnail)) {
          setFileError(t("create.form.validation.imageRequired"));
          return;
        }
      }
      const { title, publishingYear } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", publishingYear);
      if (thumbnailFile) {
        formData.append("image", thumbnailFile);
      }
      dispatch(setLoader(true));
      let createdMovieResponse;
      if (movieDetails.id) {
        // Update movie api call
        createdMovieResponse = await updateMovie(movieDetails.id, formData);
      } else {
        // Create movie api call
        createdMovieResponse = await createMovie(formData);
      }
      if (createdMovieResponse.status === 200) {
        sweetAlertToast("info", createdMovieResponse.message);
        dispatch(setLoader(false));
      }
      router.push('/movies-list')
    } catch (error) {
      sweetAlertToast("error", error);
      dispatch(setLoader(false));
    }
  };

  const onSubmit = (data: any) => {
    createOrUpdateMovie(data);
  };

  const pageTitle = movieDetails.id ? "Edit" : "Create Movie";
  return (
    <>
    <div className="flex justify-center px-6">
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl md:text-5xl font-semibold text-white py-20  md:py-30">
          {pageTitle}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-5 md:gap-x-[120px]"
        > 
          <div className="md:max-w-[450px] w-full">
          <div className="md:max-w-[450px] w-full">
            <div className="file-upload border-2 border-dashed border-white bg-input-bg rounded-2lg h-80 md:h-[500px] w-full overflow-hidden relative flex flex-col gap-2 items-center justify-center">
              {thumbnailUrl || movieDetails.image_url ? (
                <>
                  <button
                    type="button"
                    onClick={removeImg}
                     
                    className="w-5 h-5 rounded-full bg-[#ffffff] flex items-center justify-center absolute right-2.5 top-2.5 hover:bg-[#454545]"
                  >
                  
                    <Image src={close} alt="close" className="h-2"/>
                  </button>
                  <img
                    width={1068}
                    height={646}
                    className="h-full w-full object-cover"
                    src={thumbnailUrl ? thumbnailUrl : movieDetails.image_url}
                    alt="Thumbnail"
                  />
                </>
              ) : (
                <>
                  <FileUploader
                    id="thumbnail"
                    onTypeError={(error: any) => validateFile(error)}
                    onSizeError={(error: any) => validateFile(error)}
                    maxSize={5}
                    multiple={false}
                    handleChange={(file: any) => handleFile(file)}
                    name="file" 
                    types={FILE_TYPES}
                  >
                <div className="flex flex-col items-center">
                <Image src={download} className="mb-2" alt="download" />
                    <div className="text-center text-white text-sm">
                      Drop an image here
                    </div>
                </div>
                  </FileUploader>
                </>
              )}

           
            </div>
            {fileError && (
               <span className="text-red-500 text-sm">
                {fileError}{" "}
              </span>
            )}
          </div>
          <div className="flex md:hidden  space-x-4 mt-10 md:mt-16 mb-4 ">
              <Link
                href="/"
                type="button"
                className="bg-transparent border flex items-center border-white text-white px-10 md:px-12 py-2 text-base font-bold h-12 rounded-2lg hover:bg-secondary hover:border-secondary transition-colors duration-300"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                className="bg-primary text-white px-10 md:px-12 py-2 text-base font-bold h-12 rounded-2lg hover:bg-secondary  transition-colors duration-300"
                title={movieDetails.id ? "Update" : "Submit"}
              />
            </div>
            </div>
          <div className="md:max-w-[360px] w-full">
            <div className="mb-6">
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="block rounded-2lg px-4 py-3 w-full text-sm text-white bg-input-bg  border border-input-bg  appearance-none focus:outline-none focus:ring-0 focus:border-input-bg  peer"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Title should be of min 3" },
                  maxLength: {
                    value: 20,
                    message: "Title should be of max 20",
                  },
                })}
              />
              {errors.title && (
                 <span className="text-red-500 text-sm">
                  {(errors.title as { message: string }).message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <input
                min={0}
                type="number"
                id="publishingYear"
                placeholder="Publishing year"
                className="block appearance-none  w-full md:w-auto rounded-2lg px-4 py-3  text-sm text-white bg-input-bg  border border-input-bg    focus:outline-none focus:ring-0 focus:border-input-bg  peer"
                {...register("publishingYear", {
                  required: "Publising Year is required",
                  min: {
                    value: 1900,
                    message: "Min publishing year should be 1900",
                  },
                  max: {
                    value: 2024,
                    message: "Max publishing year should be 2024",
                  },
                })}
              />
              {errors.publishingYear && (
                 <span className="text-red-500 text-sm">
                  {(errors.publishingYear as { message: string }).message}
                </span>
              )}
            </div>

            <div className="hidden md:flex  space-x-4 mt-10 md:mt-16 mb-4 ">
              <Link
                href="/movies-list"
                type="button"
                className="bg-transparent border flex items-center border-white text-white px-8 md:px-12 py-2 text-base font-bold h-12 rounded-2lg hover:bg-secondary hover:border-secondary transition-colors duration-300"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                className="bg-primary text-white px-8 md:px-12 py-2 text-base font-bold h-12 rounded-2lg hover:bg-secondary  transition-colors duration-300"
                title={movieDetails.id ? "Update" : "Submit"}
              />
            </div>
          </div>
        </form>
      </div>

    </div>
      <Image src={vecter} alt="vector"  className=" pointer-events-none w-full hidden sm:block" />
    <Image src={mobilevecter} alt="vector"  className=" pointer-events-none w-full block sm:hidden" />
      </>
  );
};

export default MovieForm;
