const _apiUrl = "/api/posts";

export const createPost = (post) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }).then((res) => res.json());
};