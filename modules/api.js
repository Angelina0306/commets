const API_URL = "https://wedev-api.sky.pro/api/v1/ang3linaa/comments";

export const getCommentsFromServer = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.comments;
};

export const addCommentToServer = async (name, text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, text }),
  });
  const data = await response.json();
  
  return data.result;
};
