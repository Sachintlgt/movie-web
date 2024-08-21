'use client'
import Header from '@/components/header';
import MovieCard from '@/components/movieCard';
import Pagination from '@/components/pagination';
import { IMovie } from '@/interfaces/movie';
import { getMovies } from '@/services/movieService';
import { sweetAlertToast } from '@/services/toastServices';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const MoviesPage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 10;
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'

  useEffect(() => {
    (async () => {
        try {
            const resp = await getMovies(+page || 1, itemsPerPage);
            if (resp.status === 200) {
                setMovies(resp.data.list)
                setTotalItems(resp.data.meta.totalCount)
            }
            //   dispatch(setLoader(false));
          } catch (err: any) {
            const { error } = err.data;
            sweetAlertToast("error", error);
            //   dispatch(setLoader(false));
            return;
          }
    })()
  }, [page]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return <>
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
            push(`/movies?page=${page}`)
        }}
      />
    </div>
  </>
};

export default MoviesPage;