const _apiUrl = "/api/reaction";

export const getAllReactionTypes = () => {
  return fetch(_apiUrl + "/types").then((res) => res.json());
};
