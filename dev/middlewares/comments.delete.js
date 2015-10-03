import sleep from 'sleep';

import commentsStorage from 'dev/storages/comments';
import serverConfig    from 'config/server/server.base';


const url = serverConfig.apiURL('/comments/:commentId');

const middleware = (req, res) => {
  sleep.usleep(500000);

  commentsStorage.updateStorage(storage => {

    const commentId = parseInt(req.params.commentId, 10);
    const commentIndex = (
      storage
        .getComments()
        .findIndex(comment => comment.id === commentId)
    );

    storage.getComments().splice(commentIndex, 1);

    res.end();

  });
};

export default [url, middleware];
