import { IMovie } from "./movie";

export interface IRedux {
  loader: {
    loading: boolean;
  };
  movieList: IMovie[];
}
