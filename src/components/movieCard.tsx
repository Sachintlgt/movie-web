// components/Card.js

import { IMovie } from "@/interfaces/movie";

const MovieCard: React.FC<IMovie> = ({id, image_url, title, year}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img 
        src={image_url} 
        alt={title} 
        width={400} 
        height={250} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
