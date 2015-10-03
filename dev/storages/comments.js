import comments from 'dev/data/comments.json';

export default {

  getComments() {
    return comments;
  },

  updateStorage(updater) {
    return updater(this);
  },

  getNewCommentId() {
    return comments.length + 1;
  },

  findComment(commentId) {
    return (
      comments
        .find(comment => comment.id === commentId)
    );
  },

}
