import callApi from "./callApi"
import { getLocalStorage } from "./utils"

export const getMovies = (page = 1, limit = 100) => {
    const createdBy = getLocalStorage('userId')
    return callApi(`/movies?page=${page}&limit=${limit}&created_by=${createdBy}`)
}