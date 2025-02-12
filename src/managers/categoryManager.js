const _apiUrl = "/api/category";

export const getCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const postCategory = (newCategory) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
};

export const deleteCategory = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCategory = (newCategory) => {
  return fetch(`${_apiUrl}/ ${newCategory.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
};
