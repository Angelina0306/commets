import { comments } from "./comments.js";
import {
  handleCommentClick,
  handleLikeClick,
  initLoadListener,
} from "./initListeners.js";
export const renderComments = () => {
  const list = document.querySelector(".comments");

  list.innerHTML = comments
    .map((comment, index) => {
      return `
                    <li class ="comment" data-index="${index}">
                        <div class="comment-header">
                            <div>${comment.name}</div>
                            <div>${comment.date.toLocaleDateString()}</div>
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

initLoadListener();
