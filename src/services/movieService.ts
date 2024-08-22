import { IMovie } from "@/interfaces/movie"
import callApi from "./callApi"
import { getLocalStorage } from "./utils"

export const getMovies = (page = 1, limit = 100) => {
    const createdBy = getLocalStorage('userId')
    return callApi(`/movies?page=${page}&limit=${limit}&created_by=${createdBy}`)
}

export const getMovie = (id: number) => {
    return callApi(`/movies/${id}`)
}

export const createMovie = (data: FormData) => {
    return callApi(`/movies`, "post", data)
}

export const updateMovie = (id: number, data: FormData) => {
    return callApi(`/movies/${id}`, "put", data)
}