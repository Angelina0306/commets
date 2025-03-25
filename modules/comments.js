export const getComments = async () => {
  const response = await fetch("https://wedev-api.sky.pro/api/v1/angelina/comments");
  const data = await response.json();
  return data.comments;
};

export const addComment = async (name, text) => {
  const response = await fetch("https://wedev-api.sky.pro/api/v1/angelina/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
  });
  const data = await response.json();
  return data.result;
};
