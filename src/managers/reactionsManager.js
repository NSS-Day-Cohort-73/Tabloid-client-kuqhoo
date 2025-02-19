const _apiUrl = "/api/reaction";

export const getAllReactionTypes = () => {
  return fetch(_apiUrl + "/types").then((res) => res.json());
};

export const postNewReactionType = (newReactionType) => {
  return fetch(_apiUrl + "/type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReactionType),
  });
};
