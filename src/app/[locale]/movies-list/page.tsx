"use client";
import Header from "@/app/[locale]/components/header";
import MovieCard from "@/app/[locale]/components/movieCard";
import MovieListEmpty from "@/app/[locale]/components/movieListEmpty";
import Pagination from "@/app/[locale]/components/pagination";
import { IMovie } from "@/interfaces/movie";
import { IRedux } from "@/interfaces/redux";
import { setLoader } from "@/redux/loaderSlice";
import { setMovieList } from "@/redux/movieListSlice";
import { getMovies } from "@/services/movieService";
import { sweetAlertToast } from "@/services/toastServices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";
import vecter from "@/../public/images/bottom-vector.svg"
import mobileVecter from "@/../public/images/mobile-vector.svg"
import { useTranslation } from "react-i18next";
import { hocAuth } from "../components/hoc/HOCAuth";

// Movies list component 
const MoviesPage = () => {
  const { t } = useTranslation();
  const loader = useSelector((state: IRedux) => state.loader.loading);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const { push } = useRouter();
  
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const dispatch = useDispatch();
  const movies: IMovie[] = useSelector((state: IRedux) => state.movieList);

  useEffect(() => {
    // get the movies list 
    (async () => {
      try {
        dispatch(setLoader(true));
        const resp = await getMovies(+page || 1, itemsPerPage);
        if (resp.status === 200) {
          dispatch(setMovieList(resp.data.list));
          setTotalItems(resp.data.meta.totalCount);
        }
        dispatch(setLoader(false));
      } catch (err: any) {
        const { error } = err.data;
        sweetAlertToast("error", error);
        dispatch(setLoader(false));
        return;
      }
    })();
  }, [page]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleMovieClick = (id: number) => {
    push(`/movie/${id}`);
  };


  
  return movies.length === 0 && !loader ? (
    <MovieListEmpty />
  ) : (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-4 py-0 md:min-h-fix"> 
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
            >
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={+page}
          totalPages={totalPages}
          onPageChange={(page: number) => {
            push(`/movies-list?page=${page}`);
          }}
        />
      </div>
      <Image className="w-full sticky bottom-0 hidden sm:block" src={vecter} alt="vector"/>
      <Image className="w-full sticky bottom-0 block sm:hidden" src={mobileVecter} alt="vector"/>
    </>
  );
};

export default hocAuth(MoviesPage);
