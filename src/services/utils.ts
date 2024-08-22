export const saveLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

export const clearLocalStorage = () => {
    localStorage.removeItem("token");
}