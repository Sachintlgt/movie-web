"use client";

import MovieListEmpty from "@/components/movieListEmpty";
import { IMovie } from "@/interfaces/movie";
import { IRedux } from "@/interfaces/redux";
import { setLoader } from "@/redux/loaderSlice";
import { setMovieList } from "@/redux/movieListSlice";
import { getMovies } from "@/services/movieService";
import { sweetAlertToast } from "@/services/toastServices";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Header from "../[locale]/components/header";
import MovieCard from "../[locale]/components/movieCard";
import Pagination from "../[locale]/components/pagination";

const MoviesPage = () => {
  const loader = useSelector((state: IRedux) => state.loader.loading);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const dispatch = useDispatch();
  const movies: IMovie[] = useSelector((state: IRedux) => state.movieList);
  console.log(movies, "movies");

  useEffect(() => {
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
  return movies.length === 0 && !loader ? (
    <MovieListEmpty />
  ) : (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Movie List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <li key={movie.id} className="mb-2">
              <MovieCard {...movie} />
            </li>
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
    </>
  );
};

export default MoviesPage;
