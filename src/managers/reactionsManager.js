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

export const deleteAReactionType = (id) => {
  return fetch(_apiUrl + `/type/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateAReactionType = (reactionType) => {
  return fetch(`${_apiUrl}/type/${reactionType.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reactionType),
  });
};
