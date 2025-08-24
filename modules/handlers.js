import {
  getComment,
  addComment,
  updateCommentLikes,
} from "./comments.js";
import { renderComments } from "./render.js";
import { addCommentToServer, register, login, toggleLike } from "./api.js";

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
  const id = commentElement.dataset.id;

  if (index === undefined) return;

  // if (getComment(index).isLiked) {
  //   dislikeComment(index);
  // } else {
  //   likeComment(index);
  // }

  toggleLike(id).then((data) => {
    updateCommentLikes(index, data.isLiked, data.likes);
    renderComments();
  })
  
};

export const handleCommentClick = (event) => {
  const textInput = document.querySelector(".add-form-text");
  if (event.target.tagName !== "LI") return;
  const commentElement = event.currentTarget;
  const index = commentElement.dataset.index;

  if (index === undefined) return;

  const comment = getComment(index);
  textInput.value = `[${comment.author.name}]\n> ${comment.text}\n`;
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

export const handleRegFormSubmit = async (event) => {
  event.preventDefault();
  const loginInput = document.querySelector(".login-input");
  const nameInput = document.querySelector(".name-input");
  const passwordInput = document.querySelector(".password-input");
  const login = escapeHTML(loginInput.value.trim());
  const name = escapeHTML(nameInput.value.trim());
  const password = escapeHTML(passwordInput.value.trim());
  if (login.length < 3 || name.length < 3 || password.length < 3) {
    alert("Логин, имя и пароль должны быть длиннее 3 символов.");
    return;
  }
  try {
    const regData = await register(login, name, password);
    localStorage.setItem("user", JSON.stringify({"name": regData.name, "token": regData.token, "id": regData.id}));
    window.location.href = "/";
  } catch (e) {
    alert(e.message);
  }
};

export const handleLoginFormSubmit = async (event) => {
  event.preventDefault();
  const loginInput = document.querySelector(".login-input");
  const passwordInput = document.querySelector(".password-input");
  const loginText = escapeHTML(loginInput.value.trim());
  const password = escapeHTML(passwordInput.value.trim());
  if (loginText.length < 3 || password.length < 3) {
    alert("Логин и пароль должны быть длиннее 3 символов.");
    return;
  }
  try {
    const loginData = await login(loginText, password);
    localStorage.setItem("user", JSON.stringify({"name": loginData.name, "token": loginData.token, "id": loginData.id}));
    window.location.href = "/";
  } catch (e) {
    alert(e.message);
  }
};

export const handleLogoutButtonClick = () => {
  localStorage.removeItem("user");
  window.location.reload();
};