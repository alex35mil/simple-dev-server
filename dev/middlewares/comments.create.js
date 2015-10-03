import sleep from 'sleep';

import commentsStorage from 'dev/storages/comments';
import serverConfig    from 'config/server/server.base';


const url = serverConfig.apiURL('/comments');

const middleware = (req, res) => {
  sleep.usleep(500000);

  commentsStorage.updateStorage(storage => {

    const commentId  = storage.getNewCommentId();
    const newComment = Object.assign({ id: commentId }, req.body);

    storage.getComments().push(newComment);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ comment: newComment }));

  });
};

export default [url, middleware];
