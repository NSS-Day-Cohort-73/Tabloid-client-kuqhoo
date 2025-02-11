const _apiUrl = "/api/categories"

export const getCategories = () => {
    return fetch(_apiUrl).then((res) => res.json());
};