import {
  handleAddComment,
  handleLogoutButtonClick,
} from "./modules/handlers.js";
import { renderComments } from "./modules/render.js";
import { getCommentsFromServer } from "./modules/api.js";
import { addComment } from "./modules/comments.js";
import { showLoginForm, showRegForm } from "./modules/registerForm.js";

export const init = async () => {
  if (!localStorage.getItem("user")) {
    const addForm = document.querySelector(".add-form");
    const logoutButton = document.querySelector(".logout-button");
    const authAlert = document.querySelector(".auth-alert");
    authAlert.style.display = "block";
    logoutButton.style.display = "none";
    addForm.style.display = "none";
  }

  const addButton = document.querySelector(".add-form-button");
  const loadingContainer = document.querySelector(".loading-container");
  const commentsContainer = document.querySelector(".comments");
  const loginButton = document.querySelector("#loginButton");
  const regButton = document.querySelector("#authButton");

  const logoutButton = document.querySelector(".logout-button");
  logoutButton.addEventListener("click", handleLogoutButtonClick);

  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const addFormName = document.querySelector(".add-form-name");
    addFormName.value = user.name;
    addFormName.setAttribute("readonly", "true");
    try {
      const comments = await getCommentsFromServer();

      

      comments.forEach((comment) => {
        addComment(comment);
      });
      renderComments();
    } catch (e) {
      alert(e.message);
    }
  }

  loginButton.addEventListener("click", showLoginForm);
  regButton.addEventListener("click", showRegForm);
  addButton.addEventListener("click", handleAddComment);
  loadingContainer.style.display = "none";
      commentsContainer.style.display = "flex";
};


init();
