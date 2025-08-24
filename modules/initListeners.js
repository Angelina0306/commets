import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";

const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

export const handleLikeClick = (event) => {
  const commentElement = event.target.closest(".comment");
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  if (comments[index].isLiked) {
    comments[index].likes--;
  } else {
    comments[index].likes++;
  }
  comments[index].isLiked = !comments[index].isLiked;
  renderComments();
};

export const handleCommentClick = (event) => {
  const commentElement = event.currentTarget;
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  const comment = comments[index];
  nameInput.value = comment.name;
  textInput.value = `> ${comment.text}`;
};

export const initLoadListener = () => {
  renderComments();

  addButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (name === "" || text === "") {
      alert("Пожалуйста, введите имя и комментарий.");
      return;
    }

    const newComment = {
      name: escapeHtml(name),
      date: new Date(),
      text: escapeHtml(text),
      likes: 0,
      isLiked: false,
    };

    comments.push(newComment);

    renderComments();

    nameInput.value = "";
    textInput.value = "";
  });
};
