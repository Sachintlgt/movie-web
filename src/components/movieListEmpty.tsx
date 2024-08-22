import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"

const MovieListEmpty = () =>  {
  const { push } = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 mb-4">Your movie list is empty</p>

        <Button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            title="Add a new movie"
            action={() => {
              push('/movie/new-movie')
            }}
          />
      </div>
    </div>
  )
}
export default MovieListEmpty;
