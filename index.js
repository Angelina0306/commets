import { handleAddComment } from "./modules/handlers.js";
import { renderComments } from "./modules/render.js";
import { getCommentsFromServer } from "./modules/api.js";
import { addComment } from "./modules/comments.js";

export const init = async () => {
  const addButton = document.querySelector(".add-form-button");
  
  addButton.addEventListener("click", handleAddComment);
  
  const comments = await getCommentsFromServer();

  comments.forEach(comment => {
    addComment(comment);
  });
  renderComments();
  
};

init();