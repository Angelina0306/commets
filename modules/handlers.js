import {
  getComment,
  likeComment,
  dislikeComment,
  addComment,
} from "./comments.js";
import { renderComments } from "./render.js";
import { addCommentToServer } from "./api.js";

const escapeHTML = (str) => {
  return str.replace(/[&<>'"]/g, (tag) => {
    const tagsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return tagsToReplace[tag] || tag;
  });
};

export const handleLikeClick = (event) => {
  const commentElement = event.target.closest(".comment");
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  if (getComment(index).isLiked) {
    dislikeComment(index);
  } else {
    likeComment(index);
  }
  renderComments();
};

export const handleCommentClick = (event) => {
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  if (event.target.tagName !== "LI") return;
  const commentElement = event.currentTarget;
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  const comment = getComment(index);
  nameInput.value = comment.author.name;
  textInput.value = `> ${comment.text}`;
};

export const handleAddComment = async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const loadingContainer = document.querySelector(".loading-container");
  const form = document.querySelector(".add-form");

  const name = escapeHTML(nameInput.value.trim());
  const text = escapeHTML(textInput.value.trim());
  if (name.length < 3 || text.length < 3) {
    alert("Текст и имя должны быть длиннее 3 символов.");
    return;
  }
  const comment = {
    author: {
      name,
    },
    text,
    date: new Date(),
    likes: 0,
    isLiked: false,
  };

  loadingContainer.style.display = "block";
  form.style.display = "none";

  try {
    await addCommentToServer(comment.author.name, comment.text);
  } catch (e) {
    alert(e.message);
    loadingContainer.style.display = "none";
    form.style.display = "flex";
    return;
  }

  addComment(comment);
  renderComments();

  nameInput.value = "";
  textInput.value = "";

  loadingContainer.style.display = "none";
  form.style.display = "flex";
};
