const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(`/api/userprofile/admin/details/${id}`).then((res) =>
    res.json()
  );
};
