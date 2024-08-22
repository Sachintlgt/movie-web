export interface IMovieForm {
  title: string;
  year: number | null;
  thumbnail: string;
  id?: number;
}

export interface IMovie {
  id: number
  title: string
  year: number
  image_url: string
  created_at: string
}
