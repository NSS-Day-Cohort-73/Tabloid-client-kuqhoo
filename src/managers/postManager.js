export const getAllPosts = () => {
  return fetch("/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tabloid_token")}`,
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Please log in to view posts");
      }
      throw new Error("An error occurred while fetching posts");
    }
    return res.json();
  });
};
