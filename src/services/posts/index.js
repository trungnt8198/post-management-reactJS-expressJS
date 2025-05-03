const API_URL = import.meta.env.VITE_API_URL;

export const removePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 204) return {};
  if (response.status === 404) {
    const data = await response.json();
    throw { message: data.message };
  }
};

export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  if (response.status === 404) {
    throw { message: data.message };
  }
  return data;
};

export const createPost = async (post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const data = await response.json();
  if (response.status === 404) {
    throw { message: data.message };
  }
  return data;
};

export const getAllPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  const data = await response.json();
  return data;
};
