const API_URL = "https://wedev-api.sky.pro/api/v1/angelina/comments";

export const getCommentsFromServer = async () => {
  let response;
  try {
    response = await fetch(API_URL);
  } catch (error) {
    throw new Error("У вас пропал интернет. Ошибка: " + error.message);
  }
  if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  // 400-е невозможны, так как мы не передаём никаких параметров
  const data = await response.json();
  return data.comments;
};

export const addCommentToServer = async (name, text) => {
  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name, text, forceError: true }),
    });
  } catch (error) {
    throw new Error("У вас пропал интернет. Ошибка: " + error.message);
  }
    if (response.status >= 500) {
      throw new Error("Сервер сломался");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error("Неверный запрос");
    }
    const data = await response.json();
    return data.result;
};
