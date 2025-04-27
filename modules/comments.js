export let comments = [];

export const addComment = (comment) => {
  comments.push(comment);
};

export const getComment = (index) => {
  return comments[index];
};

export const updateCommentLikes = (index, isLiked, likes) => {
  comments[index].isLiked = isLiked;
  comments[index].likes = likes;
};

// export const likeComment = (index) => {
//   comments[index].likes++;
//   comments[index].isLiked = true;
// };

// export const dislikeComment = (index) => {
//   comments[index].likes--;
//   comments[index].isLiked = false;
// };
