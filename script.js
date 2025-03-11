// "use strict";

// const comments = [
//   {
//     name: "Глеб Фокин",
//     date: new Date(),
//     text: "Это будет первый комментарий на этой странице",
//     likes: 3,
//     isLiked: false,
//   },
//   {
//     name: "Варвара Н.",
//     date: new Date(),
//     text: "Мне нравится как оформлена эта страница! ❤",
//     likes: 75,
//     isLiked: true,
//   },
// ];

// function escapeHtml(text) {
//   const map = {
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#039;",
//   };

//   return text.replace(/[&<>"']/g, function (m) {
//     return map[m];
//   });
// }

// const renderComments = () => {
//   const list = document.querySelector(".comments");

//   list.innerHTML = comments
//     .map((comment, index) => {
//       return `
//                     <li class ="comment" data-index="${index}">
//                         <div class="comment-header">
//                             <div>${comment.name}</div>
//                             <div>${comment.date.toLocaleDateString()}</div>
//                         </div>
//                         <div class="comment-body">
//                             <div class="comment-text">
//                                 ${comment.text}
//                             </div>
//                         </div>
//                         <div class="comment-footer">
//                             <div class="likes">
//                                 <span class="likes-counter">${
//                                   comment.likes
//                                 }</span>
//                                 <button class="like-button ${
//                                   comment.isLiked ? "-active-like" : ""
//                                 }"></button>
//                             </div>
//                         </div>
//                     </li> 
//                 `;
//     })
//     .join("");

//   document.querySelectorAll(".like-button").forEach((button) => {
//     button.addEventListener("click", handleLikeClick);
//   });

//   document.querySelectorAll(".comment").forEach((commentElement) => {
//     commentElement.addEventListener("click", handleCommentClick);
//   });
// };

// const handleLikeClick = (event) => {
//   const commentElement = event.target.closest(".comment");
//   const index = commentElement.dataset.index;

//   if (index === undefined) return;

//   if (comments[index].isLiked) {
//     comments[index].likes--;
//   } else {
//     comments[index].likes++;
//   }
//   comments[index].isLiked = !comments[index].isLiked;
//   renderComments();
// };

// const handleCommentClick = (event) => {
//   const commentElement = event.currentTarget;
//   const index = commentElement.dataset.index;

//   if (index === undefined) return;

//   const comment = comments[index];
//   nameInput.value = comment.name;
//   textInput.value = `> ${comment.text}`;
// };

// renderComments();

// const addButton = document.querySelector(".add-form-button");
// const nameInput = document.querySelector(".add-form-name");
// const textInput = document.querySelector(".add-form-text");

// addButton.addEventListener("click", () => {
//   const name = nameInput.value.trim();
//   const text = textInput.value.trim();

//   if (name === "" || text === "") {
//     alert("Пожалуйста, введите имя и комментарий.");
//     return;
//   }

//   const newComment = {
//     name: escapeHtml(name),
//     date: new Date(),
//     text: escapeHtml(text),
//     likes: 0,
//     isLiked: false,
//   };

//   comments.push(newComment);

//   renderComments();

//   nameInput.value = "";
//   textInput.value = "";
// });
