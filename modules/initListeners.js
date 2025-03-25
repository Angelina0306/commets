import { renderComments } from "./renderComments.js";
import { addComment, getComments  } from "./comments.js";

const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
let comments = await getComments();

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

  console.log(comments[index]);

  if (comments[index].isLiked) {
    comments[index].likes--;
  } else {
    comments[index].likes++;
  }
  comments[index].isLiked = !comments[index].isLiked;
  renderComments(comments);
};

export const handleCommentClick = (event) => {
  if (event.target.tagName !== "LI") return;
  const commentElement = event.currentTarget;
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  const comment = comments[index];
  nameInput.value = comment.name;
  textInput.value = `> ${comment.text}`;
};

export const initLoadListener = () => {
  renderComments(comments);

  addButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (name.length < 3 || text.length < 3) {
      alert("Текст и имя должны быть длиннее 3 символов.");
      return;
    }

    await addComment(escapeHtml(name), escapeHtml(text));
    comments.push({
      name: escapeHtml(name),
      text: escapeHtml(text),
      date: new Date(),
      likes: 0,
      isLiked: false,
    });
    renderComments(comments);

    nameInput.value = "";
    textInput.value = "";
  });
};
