import { FILE_TYPES } from "@/app/utility/constants";
import Image from "next/image";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import close from "../../../../public/images/cross.svg";
import Link from "next/link";

const MovieForm = (props: any) => {
  const { movieDetails } = props;
  const [fileError, setFileError] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<any>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: movieDetails.title,
      publishingYear: movieDetails.publishingYear,
      thumbnail: movieDetails.thumbnail,
    },
  });

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

  const handleFile = (file: any) => {
    if (file) {
      setFileError("");
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      setThumbnailFile(file);
    }
  };
  // remove file
  const removeImg = () => {
    setFileError("Please choose thumbnail file.");
    setThumbnailUrl("");
    setThumbnailFile(null);
  };

  const createNewMovie = async (data: any) => {
    try {
      if (!thumbnailFile || movieDetails.thumbnail) {
        setFileError("Please Select thumbnail");
        return;
      }
      const { title, publishingYear } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      if (thumbnailFile) {
        formData.append("image", thumbnailFile);
      }

      // create  api call
    } catch (error) {}
  };

  const updateMovie = async (data: any) => {
    try {
      if (!thumbnailFile || movieDetails.thumbnail) {
        setFileError("Please Select thumbnail");
        return;
      }

      const { title, publishingYear } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      if (thumbnailFile) {
        formData.append("image", thumbnailFile);
      }

      //  update  api call
    } catch (error) {}
  };

  const onSubmit = (data: any) => {
    console.log(data);
    if (movieDetails.id) {
      updateMovie(data);
    } else {
      createNewMovie(data);
    }
    if (!thumbnailFile || movieDetails.thumbnail) {
      setFileError("Please Select thumbnail");
      return;
    }
    // Perform movie creation logic here
  };

  const pageTitle = movieDetails.id ? "Update Movie" : "Create Movie";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-[#081e31] px-8 py-12 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">{pageTitle}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-white font-medium text-sm mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-[#0b2c44] text-white px-4 py-3 rounded-lg w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 font-medium text-sm mt-2">
                Title is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="publishingYear"
              className="block text-white font-medium text-sm mb-2"
            >
              Publishing Year
            </label>
            <input
              min={0}
              type="number"
              id="publishingYear"
              className="bg-[#0b2c44] text-white px-4 py-3 rounded-lg w-full"
              {...register("publishingYear", {
                required: true,
                min: 1900,
                max: 2100,
              })}
            />
            {errors.publishingYear && (
              <p className="text-red-500 font-medium text-sm mt-2">
                Publishing year must be between 1900 and 2100
              </p>
            )}
          </div>
          <div className="mb-6 border border-dashed border-[#D1CFC7] rounded-lg h-48 w-full overflow-hidden relative flex items-center justify-center">
            {thumbnailUrl && (
              <>
                <button
                  type="button"
                  className="w-5 h-5 rounded-full bg-[#ffffff] flex items-center justify-center absolute right-2.5 top-2.5 hover:bg-[#454545]"
                >
                  <Image
                    onClick={removeImg}
                    className="object-cover h-2"
                    src={close}
                    alt="dog"
                  />
                </button>
                <Image
                  width={1068}
                  height={646}
                  className="h-full w-full object-cover"
                  src={thumbnailUrl}
                  alt="Thumbnail"
                />
              </>
            )}
            <div className="text-center text-[#ffffff80] text-sm">
              <p>Drop an image here</p>
            </div>
            <FileUploader
              id="thumbnail"
              onTypeError={(error: any) => validateFile(error)}
              onSizeError={(error: any) => validateFile(error)}
              maxSize={5}
              multiple={false}
              className="hidden"
              handleChange={(file: any) => handleFile(file)}
              name="file"
              types={FILE_TYPES}
            />
          </div>
          {fileError && (
            <p className="text-red-500 font-medium text-sm mt-2">
              {fileError}{" "}
            </p>
          )}
          <div className="flex justify-end space-x-4">
            <Link
              href="/"
              type="button"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              {movieDetails.id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
