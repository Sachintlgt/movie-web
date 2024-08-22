import Button from "./Button";
import { useRouter } from "next/navigation"
import { useTranslation } from 'react-i18next';

// if the Movies list is empty show the Create movie button 
const MovieListEmpty = () =>  {
  const { t } = useTranslation();
  const { push } = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen bg-body px-6">
      <div className="text-center">
        <p className="text-[32px] md:text-5xl font-semibold text-white mb-10 ">Your movie list is empty</p>

        <Button
            type="button"
            className="px-4 py-2 bg-primary text-white font-semibold rounded-2lg hover:bg-primary md:w-auto w-full h-14 px-7"
            title={t("list.addNew")}
            action={() => {
              push('/movie/new-movie')
            }}
          />
      </div>
    </div>
  )
}
export default MovieListEmpty;
