import callApi from "./callApi";

export const login = (email: string, password: string) => {
    return callApi('/auth/login', 'post', { email, password });
}