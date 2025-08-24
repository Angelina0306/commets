const API_URL = "https://wedev-api.sky.pro/api/v2/angelina/comments";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getCommentsFromServer = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    }
    const data = await response.json();
    return data.comments;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addCommentToServer = async (name, text) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ name, text, forceError: true }),
    });

    if (response.status >= 500) {
      throw new Error("Сервер сломался");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error("Неверный запрос");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error("Ошибка: " + error.message);
  }
};

export const deleteCommentFromServer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    if (response.status >= 500) {
      throw new Error("Сервер сломался");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error("Неверный запрос");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error("Ошибка: " + error.message);
  }
};

export const toggleLike = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/toggle-like`, {
      method: "POST",
      headers: getAuthHeader(),
    });

    if (response.status >= 500) {
      throw new Error("Сервер сломался");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error("Неверный запрос");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error("Ошибка: " + error.message);
  }
};

export const login = async (login, password) => {
  try {
    const response = await fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error("Ошибка: " + error.message);
  }
};

export const register = async (login, name, password) => {
  try {
    const response = await fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({ login, name, password }),
    });

    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error("Ошибка: " + error.message);
  }
};
