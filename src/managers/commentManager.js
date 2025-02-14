const _apiUrl = "/api/comment/"

export const getCommentsByPostId = (postId) => {
    return fetch(_apiUrl + `${postId}`).then((res) => res.json());
}