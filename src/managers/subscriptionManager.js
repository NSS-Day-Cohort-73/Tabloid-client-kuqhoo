const baseUrl = "/api/subscription";

export const subscribeToAuthor = (authorId) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ authorId }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to subscribe to author");
    }
    return res.json();
  });
};

export const getMySubscriptions = () => {
  return fetch(`${baseUrl}/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get subscriptions");
    }
    return res.json();
  });
};

export const checkSubscription = (authorId) => {
  return fetch(`${baseUrl}/check/${authorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
};

export const unsubscribeFromAuthor = (authorId) => {
  return fetch(`${baseUrl}/${authorId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
