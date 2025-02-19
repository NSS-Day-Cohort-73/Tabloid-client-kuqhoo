const _apiUrl = "/api/comment/"

export const getCommentsByPostId = (postId) => {
    return fetch(_apiUrl + `${postId}`).then((res) => res.json());
}

export const postNewComment = (comment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Application-Type": "application/json"
        },
        body: comment
    }).then((res) => res.json());
}