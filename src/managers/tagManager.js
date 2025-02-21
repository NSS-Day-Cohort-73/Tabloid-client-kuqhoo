const _apiUrl = "/api/tag";

export const getTags = () => {
  return fetch(_apiUrl + "/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
};

export const createTag = (tag) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(tag),
  }).then((res) => res.json());
};

export const updateTag = (tag) => {
  return fetch(`${_apiUrl}/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(tag),
  });
};

export const deleteTag = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
