import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"

const MovieListEmpty = () =>  {
  const { push } = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen bg-body px-6">
      <div className="text-center">
        <p className="text-[32px] md:text-5xl font-semibold text-white mb-10 ">Your movie list is empty</p>

        <Button
            type="button"
            className="px-4 py-2 bg-primary text-white font-semibold rounded-2lg hover:bg-primary md:w-auto w-full h-14 px-7"
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
