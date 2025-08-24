import { handleLikeClick, handleCommentClick } from "./handlers.js";
import { comments } from "./comments.js";

export const renderComments = async () => {
  const list = document.querySelector(".comments");

  list.innerHTML = comments
    .map((comment, index) => {
      return `
                      <li class ="comment" data-index="${index}" data-id="${comment.id}">
                          <div class="comment-header">
                              <div>${comment.author.name}</div>
                              <div>${new Date(comment.date).toLocaleString()}</div>
                          </div>
                          <div class="comment-body">
                              <div class="comment-text">
                                  ${comment.text}
                              </div>
                          </div>
                          <div class="comment-footer">
                              <div class="likes">
                                  <span class="likes-counter">${
                                    comment.likes
                                  }</span>
                                  <button class="like-button ${
                                    comment.isLiked ? "-active-like" : ""
                                  }"></button>
                              </div>
                          </div>
                      </li>
                  `;
    })
    .join("");

  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", handleLikeClick);
  });

  document.querySelectorAll(".comment").forEach((commentElement) => {
    commentElement.addEventListener("click", handleCommentClick);
  });
};
